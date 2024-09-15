import { badgeVariants } from '@/components/ui/badge'
import Link from 'next/link'
import { MoveUpRight, Menu, SquareArrowOutUpRight } from 'lucide-react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet'
import { auth } from '@/server/auth'
import AvatarDropdown from './avatar-dropdown'

export default async function Navbar() {
  const session = await auth()

  type Navs = {
    title: string
    link: string
  }

  const navs: Navs[] = [
    {
      title: 'About',
      link: '/about',
    },
  ]

  return (
    <nav className="fixed z-30 flex h-12 w-full items-center justify-center border-b border-neutral-700 bg-neutral-950/50 backdrop-blur-md">
      <div className="flex w-full max-w-2xl items-center justify-between gap-10 p-5">
        <div className="flex items-center gap-4">
          <a href="/">WAYRY</a>
          <Link
            href="https://farisfaikar.vercel.app"
            target="_blank"
            className={`${badgeVariants({ variant: 'secondary' })} flex gap-1`}
          >
            <p className="hidden sm:flex">Made by Faris Faikar</p>
            <MoveUpRight size={16} />
          </Link>
        </div>

        {/* Mobile navigation */}
        <div className="flex items-center gap-5 sm:hidden">
          {!session ? (
            <Link key="/auth/login" href="/api/auth/signin" className="text-neutral-300">
              Login
            </Link>
          ) : (
            <AvatarDropdown expires={session?.expires ?? ''} user={session?.user} />
          )}
          <Sheet>
            <SheetTrigger asChild>
              <Menu />
            </SheetTrigger>
            <SheetContent className="flex h-full w-48 flex-col justify-between">
              <SheetHeader className="mt-5 h-full">
                <SheetClose asChild key="WAYRY">
                  <Link href="/" className="text-right text-xl font-bold">
                    WAYRY
                  </Link>
                </SheetClose>
                <div className="flex flex-col gap-2 text-right text-lg">
                  <SheetClose asChild key="GitHub">
                    <Link
                      href="https://github.com/farisfaikar/wayry"
                      target="_blank"
                      className="flex items-center justify-end gap-1 text-neutral-300"
                    >
                      GitHub
                      <MoveUpRight size={16} />
                    </Link>
                  </SheetClose>
                </div>
                <div className="flex flex-col gap-2 text-right text-lg">
                  {navs.map((nav) => (
                    <SheetClose asChild key={nav.link}>
                      <Link key={nav.link} href={nav.link} className="text-neutral-300">
                        {nav.title}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-8 sm:flex">
          <Link
            key="GitHub"
            href="https://github.com/farisfaikar/wayry"
            className="flex items-center gap-1 text-neutral-300"
            target="_blank"
          >
            GitHub
            <MoveUpRight size={16} />
          </Link>
          {navs.map((nav) => (
            <Link key={nav.link} href={nav.link} className="text-neutral-300">
              {nav.title}
            </Link>
          ))}
          {!session ? (
            <Link key="/auth/login" href="/auth/login" className="text-neutral-300">
              Login
            </Link>
          ) : (
            <AvatarDropdown expires={session?.expires ?? ''} user={session?.user} />
          )}
        </div>
      </div>
    </nav>
  )
}
