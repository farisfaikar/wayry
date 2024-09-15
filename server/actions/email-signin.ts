"use server"

import { db } from "@/server"
import { LoginSchema } from "@/types/login-schema"
import { createSafeActionClient } from "next-safe-action"
import { eq } from "drizzle-orm"
import { users } from "@/server/schema"
import { generateEmailVerificationToken } from "@/server/actions/tokens"
import { sendVerificationEmail } from "@/server/actions/email-verification"
import { signIn } from "@/server/auth"
import { AuthError } from "next-auth"

const action = createSafeActionClient()

export const emailSignIn = action(LoginSchema, async ({ email, password, code }) => {
  try {
    // Check if the user is in the database
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    })

    if (!existingUser || !existingUser.email) {
      return { error: "User not found" }
    }

    if (existingUser?.email !== email) {
      return { error: "Email not found" }
    }

    if (!existingUser?.emailVerified) {
      const verificationToken = await generateEmailVerificationToken(existingUser.email)
      await sendVerificationEmail(verificationToken[0].email, verificationToken[0].token)
      return { success: "Confirmation email sent!" }
    }

    console.log("the fuck")
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    })

    console.log(email, password, code)
    return { email }
  } catch (error) {
    console.log(error)

    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Incorrect email or password" }
        case "AccessDenied":
          return { error: error.message }
        case "OAuthSignInError":
          return { error: error.message }
        default:
          return { error: "Something went wrong :(" }
      }
    }

    throw error
  }
})
