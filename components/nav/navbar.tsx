import { badgeVariants } from '@/components/ui/badge'
import Link from 'next/link'
import { MoveUpRight } from 'lucide-react'

export default function Navbar() {
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
        <div className="flex gap-8">
          <a href="/about" className="text-neutral-300">
            About
          </a>
          <a href="/login" className="text-neutral-300">
            Login
          </a>
          <a href="/dashboard" className="text-neutral-300">
            Dashboard
          </a>
        </div>
      </div>
    </nav>
  )
}
