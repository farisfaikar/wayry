'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/password-input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import Socials from "@/components/auth/socials"
import BackButton from "@/components/auth/back-button"
import { Separator } from "@/components/ui/separator"

type CardWrapperProps = {
  children: React.ReactNode
  cardTitle: string
  backButtonHref: string
  backButtonLabel: string
  showSocials?: boolean
}

export default function AuthCard({
  children,
  cardTitle,
  backButtonHref,
  backButtonLabel,
  showSocials,
}: CardWrapperProps) {
  const [data, setData] = useState<{
    email: string
    password: string
  }>({
    email: '',
    password: '',
  })

  const router = useRouter()

  const login = async () => {
    // try {
    //   let { data: dataUser, error } = await supabase.auth.signInWithPassword({
    //     email: data.email,
    //     password: data.password,
    //   })

    //   if (dataUser) console.log(dataUser)
    //   if (dataUser) router.refresh()
    // } catch (error) {
    //   console.log(error)
    // }
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setData((prev: any) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <Card className="mx-auto mt-10 w-[350px]">
      <CardHeader className="text-center">
        <CardTitle>{cardTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      <div className="flex items-center gap-4">
        <Separator className="flex-1" />
        <span className="text-muted-foreground">or</span>
        <Separator className="flex-1" />
      </div>
      {showSocials && (
        <CardFooter className="flex justify-between mt-6">
          <Socials />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton href={backButtonHref} label={backButtonLabel} />
      </CardFooter>
    </Card>
  )
}
