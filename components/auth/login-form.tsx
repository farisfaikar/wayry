'use client'

import AuthCard from '@/components/auth/auth-card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/password-input'

export default function LoginForm() {
  return (
    <AuthCard
      cardTitle="Login to WAYRY!"
      backButtonHref="/auth/register"
      backButtonLabel="Create a new account"
      showSocials
    >
      <form action="/auth/login" method="post">
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              placeholder="Enter your email"
              // value={data?.email}
              // onChange={handleChange}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <PasswordInput
              id="password"
              name="password"
              placeholder="*******"
              // value={data?.password}
              // onChange={handleChange}
            />
          </div>
        </div>
      </form>
    </AuthCard>
  )
}
