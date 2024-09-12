'use client'

import AuthCard from '@/components/auth/auth-card'
import { Input } from "@/components/ui/input"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ResetSchema } from '@/types/reset-schema'
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
import { z } from 'zod'
import { useAction } from 'next-safe-action/hooks'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import ErrorForm from '@/components/auth/error-form'
import SuccessForm from '@/components/auth/success-form'
import { resetPasswordEmail } from '@/server/actions/reset-password-email'

export default function ResetPasswordEmailForm() {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const { execute, status } = useAction(resetPasswordEmail, {
    onSuccess(data) {
      if (data?.error) setError(data.error)
      if (data?.success) setSuccess(data.success)
    },
  })

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    execute(values)
  }

  return (
    <AuthCard
      cardTitle="Forgot your password?"
      cardDescription="Submit your email to get a password reset link that lets you choose a new one."
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
      showSocials={false}
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
                    disabled={status === 'executing'}
                    autoComplete="email"
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col justify-between gap-3">
            <Button className={cn('w-full', status === 'executing' ? 'animate-pulse' : '')}>
              Send password reset email
            </Button>
          </div>
          <SuccessForm message={success} />
          <ErrorForm message={error} />
        </form>
      </Form>
    </AuthCard>
  )
}
