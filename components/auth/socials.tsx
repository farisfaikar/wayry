'use client'

import { Button } from '@/components/ui/button'
import { SiGoogle, SiGithub } from '@icons-pack/react-simple-icons'
import { signIn } from 'next-auth/react'

export default function Socials() {
  return (
    <div className="flex w-full justify-between gap-2">
      <Button
        onClick={() => signIn('google', { 
          redirect: false, 
          callbackUrl: '/',
        })}
        className="flex w-full gap-2"
      >
        <SiGoogle size={18} />
        Google
      </Button>
      <Button
        onClick={() => signIn('github', { 
          redirect: false, 
          callbackUrl: '/',
        })}
        className="flex w-full gap-2"
      >
        <SiGithub size={18} />
        GitHub
      </Button>
    </div>
  )
}
