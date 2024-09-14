'use client'

import AuthCard from '@/components/auth/auth-card'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/password-input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { RegisterSchema } from '@/types/register-schema'
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
import { useAction } from 'next-safe-action/hooks'
import { cn } from '@/lib/utils'
import { useState } from "react"
import { emailRegister } from "@/server/actions/email-register"
import SuccessAlert from "@/components/success-alert"
import ErrorAlert from "@/components/error-alert"

export default function RegisterForm() {
  const [ error, setError ] = useState('')
  const [ success, setSuccess ] = useState('')

  const { execute, status } = useAction(emailRegister, {
    onSuccess(data) {
      if (data.error) setError(data.error)
      if (data.success) setSuccess(data.success)
    }
  })
  
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    execute(values)
  }

  return (
    <AuthCard
      cardTitle="Create a WAYRY account!"
      cardDescription="Enter your name, email and password to register."
      backButtonHref="/auth/login"
      backButtonLabel="Login to existing account"
      showSocials
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="John Doe"
                    type="name"
                  /> 
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
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
          <SuccessAlert message={success} />
          <ErrorAlert message={error} />
          <div className="mt-5">
            <Button className={cn('w-full', status === 'executing' ? 'animate-pulse' : '')}>
              Register
            </Button>
          </div>
        </form>
      </Form>
    </AuthCard>
  )
}
