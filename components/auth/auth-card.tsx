'use client'

import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import Socials from '@/components/auth/socials'
import BackButton from '@/components/auth/back-button'
import { Separator } from '@/components/ui/separator'

type CardWrapperProps = {
  children: React.ReactNode
  cardTitle: string
  cardDescription?: string
  backButtonHref: string
  backButtonLabel: string
  showSocials?: boolean
}

export default function AuthCard({
  children,
  cardTitle,
  cardDescription,
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
    <Card className="mx-auto mt-10 w-full sm:w-[350px]">
      <CardHeader className="text-center">
        <CardTitle>{cardTitle}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground" hidden={!cardDescription}>
          {cardDescription}
        </CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocials && (
        <>
          <div className="flex items-center gap-4">
            <Separator className="flex-1" />
            <span className="text-muted-foreground">or</span>
            <Separator className="flex-1" />
          </div>
          <CardFooter className="mt-6 flex justify-between">
            <Socials />
          </CardFooter>
        </>
      )}
      <CardFooter className="flex justify-center">
        <BackButton href={backButtonHref} label={backButtonLabel} />
      </CardFooter>
    </Card>
  )
}
