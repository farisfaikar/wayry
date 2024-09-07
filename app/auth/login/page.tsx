import LoginForm from "@/components/auth/login-form"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'What do you expect?',
  description: "This isn't that kind of project pal",
}

export default function LoginPage() {
  return (
    <LoginForm />
  )
}
