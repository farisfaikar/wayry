import { AlertCircle } from 'lucide-react'

export default function ErrorForm({ message }: { message?: string }) {
  if (!message) return null

  return (
    <div className="mt-5 flex w-full items-center gap-2 rounded-md bg-destructive p-3 text-sm text-secondary-foreground">
      <AlertCircle className="h-4 w-4" />
      <p>{message}</p>
    </div>
  )
}
