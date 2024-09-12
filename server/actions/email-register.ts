'use server'

import { RegisterSchema } from '@/types/register-schema'
import { createSafeActionClient } from 'next-safe-action'
import bcrypt from 'bcrypt'
import { db } from '@/server'
import { eq } from 'drizzle-orm'
import { users } from '@/server/schema'
import { generateEmailVerificationToken } from '@/server/actions/tokens'
import { sendVerificationEmail } from '@/server/actions/email-verification'

const action = createSafeActionClient()

export const emailRegister = action(RegisterSchema, async ({ name, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  })

  if (existingUser) {
    if (!existingUser.emailVerified) {
      const verificationToken = await generateEmailVerificationToken(email)

      await sendVerificationEmail(verificationToken[0].email, verificationToken[0].token)

      return { success: 'Email confirmation resent' }
    }
    return { error: 'Email already in use' }
  }

  // Logic for when the user is not registered
  await db.insert(users).values({
    email,
    password: hashedPassword,
    name,
  })

  const verificationToken = await generateEmailVerificationToken(email)

  await sendVerificationEmail(verificationToken[0].email, verificationToken[0].token)

  return { success: 'Confirmation email sent!' }
})
