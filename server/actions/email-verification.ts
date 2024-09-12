'use server'

import ResetPasswordEmail from "@/components/emails/reset-password-email"
import VerifyEmail from "@/components/emails/verify-email"
import getBaseURL from '@/lib/base-url'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const domain = getBaseURL()

export const sendVerificationEmail = async (email: string, token: string) => {
  const verifyEmailLink = `${domain}/auth/email-verification?token=${token}`
  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'WAYRY | Verify your email',
    react: VerifyEmail({ verifyEmailLink, email }),
    html: `<p>Click here to <a href="${verifyEmailLink}">verify your email</a></p>`,
  })

  if (error) return console.log(error)
  if (data) return console.log(data)
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetPasswordLink = `${domain}/auth/reset-password?token=${token}`
  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'WAYRY | Reset your password',
    react: ResetPasswordEmail({ resetPasswordLink, email }),
    html: `<p>Click here to <a href="${resetPasswordLink}">reset your password</a></p>`,
  })

  if (error) return console.log(error)
  if (data) return console.log(data)
}