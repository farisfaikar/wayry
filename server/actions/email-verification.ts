'use server'

import getBaseURL from '@/lib/base-url'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const domain = getBaseURL()

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/email-verification?token=${token}`
  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'WAYRY | Confirm your email',
    // react: EmailTemplate({ firstName: 'John' }),
    html: `<p>Click here to <a href="${confirmLink}">confirm your email</a></p>`,
  })

  if (error) return console.log(error)
  if (data) return console.log(data)
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/reset-password?token=${token}`
  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'WAYRY | Confirm your email',
    // react: EmailTemplate({ firstName: 'John' }),
    html: `<p>Click here to <a href="${confirmLink}">reset your password</a></p>`,
  })

  if (error) return console.log(error)
  if (data) return console.log(data)
}