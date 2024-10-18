import { TriangleAlert } from "lucide-react"
import React from "react"

export default function WarningAlert({ message }: { message: string }) {
  return (
    <div className="mb-2 flex w-full items-center gap-2 rounded-md bg-primary p-3 text-sm text-black">
      <TriangleAlert className="h-6 w-6" />
      <p>{message}</p>
    </div>
  )
}
