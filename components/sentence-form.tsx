"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import PeopleDropdownInput from "@/components/people-dropdown-input"
import { Session } from "next-auth"
import { useState } from "react"

const formSchema = z.object({
  sentence: z.string().min(1, "Sentence is required."),
  person: z.string().nullable(),
})

type SentenceFormProps = {
  session: Session | null
  className?: string
}

export default function SentenceForm({ session, className = "" }: SentenceFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  // Define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sentence: "",
      person: null,
    },
  })

  // Define submit handler
  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    setLoading(true)
    router.push(
      `/count?sentence=${encodeURIComponent(values.sentence)}&person=${encodeURIComponent(values.person || "")}`,
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={`space-y-8 ${className}`}>
        <FormField
          control={form.control}
          name="sentence"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sentence</FormLabel>
              <FormControl>
                <Input placeholder="Ummm..." {...field} />
              </FormControl>
              <FormDescription>Insert the repeating sentence</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {!session ? (
          <FormField
            control={form.control}
            name="person"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Person</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} value={field.value || ""} />
                </FormControl>
                <FormDescription>Insert the target person&apos;s name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <FormField
            control={form.control}
            name="person"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Person</FormLabel>
                <FormControl>
                  <PeopleDropdownInput {...field} value={field.value || ""} />
                </FormControl>
                <FormDescription>Select the target person</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button type="submit" className="w-full sm:w-1/3" disabled={loading}>
          {loading ? "Redirecting..." : "Count"}
        </Button>
      </form>
    </Form>
  )
}
