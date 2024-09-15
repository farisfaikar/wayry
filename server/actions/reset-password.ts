"use server"

import { getPasswordResetTokenByToken } from "@/server/actions/tokens"
import { db } from "@/server"
import { ResetPasswordSchema } from "@/types/reset-password-schema"
import { createSafeActionClient } from "next-safe-action"
import { passwordResetTokens, users } from "@/server/schema"
import { eq } from "drizzle-orm"
import bcrypt from "bcrypt"
import { Pool } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-serverless"

const action = createSafeActionClient()

export const resetPassword = action(ResetPasswordSchema, async ({ password, token }) => {
  const pool = new Pool({
    connectionString: process.env.POSGRES_URL,
  })

  const dbPool = drizzle(pool)

  if (!token) return { error: "Token missing" }

  const existingToken = await getPasswordResetTokenByToken(token)

  if (!existingToken) return { error: "Token not found" }

  const hasExpired = new Date(existingToken.expires) < new Date()

  if (hasExpired) return { error: "Token has expired" }

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, existingToken.email),
  })

  if (!existingUser) return { error: "User not found" }

  const hashedPassword = await bcrypt.hash(password, 10)

  await dbPool.transaction(async (tx) => {
    await tx
      .update(users)
      .set({
        password: hashedPassword,
      })
      .where(eq(users.id, existingUser.id))

    await tx.delete(passwordResetTokens).where(eq(passwordResetTokens.id, existingToken.id))
  })
  return { success: "Password updated" }
})
