'use server'

import { db } from "@/server"
import { users } from "@/server/schema"
import { ResetPasswordEmailSchema } from "@/types/reset-password-email-schema"
import { createSafeActionClient } from "next-safe-action"
import { eq } from 'drizzle-orm';
import { generatePasswordResetToken } from "@/server/actions/tokens"
import { sendPasswordResetEmail } from "@/server/actions/email-verification"

const action = createSafeActionClient()

export const resetPasswordEmail = action(ResetPasswordEmailSchema, async ({ email }) => {
  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email)
  })

  if (!existingUser) return { error: 'User not found' }

  const passwordResetTokens = await generatePasswordResetToken(email)

  if (!passwordResetTokens) return { error: 'Token not generated' }

  await sendPasswordResetEmail(passwordResetTokens[0].email, passwordResetTokens[0].token)

  return { success: 'Password reset email sent' }
})