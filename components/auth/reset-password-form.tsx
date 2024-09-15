'use client'

import AuthCard from '@/components/auth/auth-card'
import { PasswordInput } from '@/components/password-input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ResetPasswordSchema } from '@/types/reset-password-schema'
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
import { useState } from "react"
import ErrorAlert from "@/components/alerts/error-alert"
import SuccessAlert from "@/components/alerts/success-alert"
import { resetPassword } from "@/server/actions/reset-password"
import { useSearchParams } from "next/navigation"

export default function ResetPasswordForm() {
  const [ error, setError ] = useState('')
  const [ success, setSuccess ] = useState('')
  const token = useSearchParams().get('token')
  
  const { execute, status } = useAction(resetPassword, {
    onSuccess(data) {
      if (data?.error) setError(data.error)
      if (data?.success) setSuccess(data.success)
    }
  })
  
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: '',
    },
  })

  const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
    execute({
      password: values.password,
      token
    })
  }

  return (
    <AuthCard
      cardTitle="Reset password"
      cardDescription="Enter a new password."
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
      showSocials={false}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
                    disabled={status === 'executing'}
                    autoComplete="current-password"
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col justify-between gap-3">
            <Button className={cn('w-full', status === 'executing' ? 'animate-pulse' : '')}>
              Reset Password
            </Button>
          </div>
          <SuccessAlert message={success} />
          <ErrorAlert message={error} />
        </form>
      </Form>
    </AuthCard>
  )
}
