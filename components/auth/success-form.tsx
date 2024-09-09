import { CheckCircle } from 'lucide-react'

export default function SuccessForm({ message }: { message?: string }) {
  if (!message) return null

  return (
    <div className="mt-5 flex w-full items-center gap-2 rounded-md bg-secondary p-3 text-sm text-secondary-foreground">
      <CheckCircle className="h-4 w-4" />
      <p>{message}</p>
    </div>
  )
}
