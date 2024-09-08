'use client'

import AuthCard from '@/components/auth/auth-card'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/password-input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { LoginSchema } from '@/types/login-schema'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { z } from 'zod'
import { emailSignIn } from '@/server/actions/email-signin'
import { useAction } from 'next-safe-action/hooks'
import { cn } from '@/lib/utils'

export default function LoginForm() {
  const { execute, status } = useAction(emailSignIn, {})
  
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    execute(values)
  }

  return (
    <AuthCard
      cardTitle="Login to WAYRY!"
      cardDescription="Enter your email and password to login."
      backButtonHref="/auth/register"
      backButtonLabel="Create a new account"
      showSocials
    >
      {/* <form action="/auth/login" method="post">
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
      </form> */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="johndoe@gmail.com"
                    type="email"
                    autoComplete="email"
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    {...field}
                    placeholder="********"
                    autoComplete="current-password"
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col justify-between gap-3">
            <Button variant="link" className="self-start p-0" asChild>
              <Link href="/auth/reset">Forgot password?</Link>
            </Button>
            <Button className={cn('w-full', status === 'executing' ? 'animate-pulse' : '')}>
              Login
            </Button>
          </div>
        </form>
      </Form>
    </AuthCard>
  )
}
