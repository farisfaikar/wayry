'use client'

import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LogOut } from "lucide-react"
import Link from 'next/link'

export default function Avatar({ user }: Session) {
  return (
    <div>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <Image
            src={user?.image ?? ''}
            alt={user?.name ?? ''}
            width={32}
            height={32}
            className="rounded-full"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuLabel>
            <span className="text-sm font-medium">{user?.name}</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className="flex gap-1">
              <Link href="/dashboard">Dashboard</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className="flex gap-1">
              <LogOut size={16} />
              <span onClick={() => signOut()}>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
