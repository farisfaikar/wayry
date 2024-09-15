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
import { useState } from "react"
import ErrorAlert from "@/components/alerts/error-alert"
import SuccessAlert from "@/components/alerts/success-alert"

export default function LoginForm() {
  const [ error, setError ] = useState('')
  const [ success, setSuccess ] = useState('')
  
  const { execute, status } = useAction(emailSignIn, {
    onSuccess(data) {
      if (data?.error) setError(data.error)
      if (data?.success) setSuccess(data.success)
    }
  })
  
  const form = useForm<z.infer<typeof LoginSchema>>({
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
              <Link href="/auth/reset-password-email">Forgot password?</Link>
            </Button>
            <Button className={cn('w-full', status === 'executing' ? 'animate-pulse' : '')}>
              Login
            </Button>
          </div>
          <SuccessAlert message={success} />
          <ErrorAlert message={error} />
        </form>
      </Form>
    </AuthCard>
  )
}
