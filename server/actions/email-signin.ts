'use server'

import { LoginSchema } from '@/types/login-schema'
import { createSafeActionClient } from 'next-safe-action'

const action = createSafeActionClient()

export const emailSignIn = action(
  LoginSchema,
  async ({ email, password, code }) => {
    // Check if the user is in the database
    console.log(email, password, code)
    return { email }
  },
)
