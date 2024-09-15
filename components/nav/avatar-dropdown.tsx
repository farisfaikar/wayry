'use client'

import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LogOut } from 'lucide-react'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function AvatarDropdown({ user }: Session) {
  const getInitials = (name: string | null | undefined) => {
    if (!name) return ''
    const nameParts = name.split(' ')
    const firstInitial = nameParts[0]?.[0]?.toUpperCase() ?? ''
    const secondInitial = nameParts[1]?.[0]?.toUpperCase() ?? ''
    return `${firstInitial}${secondInitial}`
  }

  return (
    <div>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.image ?? ''} alt={user?.name ?? ''} />
            <AvatarFallback className="text-sm">{getInitials(user?.name)}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="flex flex-col gap-2">
            <p className="text-md font-bold">{user?.name}</p>
            <p className="text-xs font-medium text-neutral-400">{user?.email}</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className="flex gap-1" asChild>
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
