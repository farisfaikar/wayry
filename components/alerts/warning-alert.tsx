import {  TriangleAlert } from "lucide-react"
import React from "react"

export default function WarningAlert({ message }: { message: string }){
  return (
    <div className="mt-5 flex w-full items-center gap-2  rounded-md  bg-[#FFF9DB] p-3 text-sm text-black">
      <TriangleAlert className="h-6 w-6" />
    <p>{message}</p>
  </div>
  )
}
