"use client"

import AuthCard from "@/components/auth/auth-card"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ResetPasswordEmailSchema } from "@/types/reset-password-email-schema"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { useAction } from "next-safe-action/hooks"
import { cn } from "@/lib/utils"
import { useState } from "react"
import ErrorAlert from "@/components/alerts/error-alert"
import SuccessAlert from "@/components/alerts/success-alert"
import { resetPasswordAction } from "@/server/actions/reset-password-action"

export default function ResetPasswordEmailForm() {
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const { execute, status } = useAction(resetPasswordAction, {
    onSuccess(data) {
      if (data?.error) setError(data.error)
      if (data?.success) setSuccess(data.success)
    },
  })

  const form = useForm<z.infer<typeof ResetPasswordEmailSchema>>({
    resolver: zodResolver(ResetPasswordEmailSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = (values: z.infer<typeof ResetPasswordEmailSchema>) => {
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
                    disabled={status === "executing"}
                    autoComplete="email"
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col justify-between gap-3">
            <Button className={cn("w-full", status === "executing" ? "animate-pulse" : "")}>
              Send password reset email
            </Button>
          </div>
          <SuccessAlert message={success} />
          <ErrorAlert message={error} />
        </form>
      </Form>
    </AuthCard>
  )
}
