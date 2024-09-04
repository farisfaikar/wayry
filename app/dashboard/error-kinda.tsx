'use client'

import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
import { RotateCcw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="absolute inset-0 -z-10 mx-auto flex max-w-xl items-center justify-center">
      <div className="flex h-20 items-center border-r border-secondary p-5 text-2xl">400</div>
      <p className="p-5 text-sm">Something went wrong!</p>
      <Button variant="outline" onClick={reset} className="flex items-center gap-2">
        <RotateCcw size={16} /> Try again
      </Button>
    </div>
  )
}
