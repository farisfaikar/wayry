import { badgeVariants } from '@/components/ui/badge'
import Link from 'next/link'
import { MoveUpRight, Menu } from 'lucide-react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet'

export default function Navbar() {
  type Navs = {
    title: string
    link: string
  }

  const navs: Navs[] = [
    {
      title: 'GitHub',
      link: 'https://github.com/farisfaikar/wayry',
    },
    {
      title: 'About',
      link: '/about',
    },
    {
      title: 'Dashboard',
      link: '/dashboard',
    },
    {
      title: 'Login',
      link: '/login',
    },
  ]

  return (
    <nav className="fixed flex h-12 w-full items-center justify-center border-b border-neutral-700 bg-neutral-950/50 backdrop-blur-md">
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
        <div className="flex sm:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Menu />
            </SheetTrigger>
            <SheetContent className="flex h-full flex-col justify-between">
              <SheetHeader className="mt-5">
                <SheetClose asChild key="WAYRY">
                  <Link href="/" className="text-right text-xl font-bold">
                    WAYRY
                  </Link>
                </SheetClose>
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
          {navs.map((nav) => (
            <Link key={nav.link} href={nav.link} className="text-neutral-300">
              {nav.title}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
