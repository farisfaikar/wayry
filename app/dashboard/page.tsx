import getPeopleWithSentences from "@/server/actions/get-people-with-sentences"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CirclePlus } from "lucide-react"
import type { Metadata } from "next"
import SentenceTable from "@/components/sentence-table"

export const metadata: Metadata = {
  title: "What the hell are you looking for?",
  description: "These are just a bunch of useless data.",
}

export default async function DashboardPage() {
  const { error, success } = await getPeopleWithSentences()

  if (error) {
    throw new Error(error)
  }

  // Check if success is empty
  if (success && success.length === 0) {
    return (
      <div className="absolute inset-0 flex h-full flex-col items-center justify-center">
        <h2 className="text-xl font-bold">No Sentences Found :(</h2>
        <p className="text-neutral-500">There are currently no sentences available.</p>
        <Button variant="outline" className="mt-2">
          <Link href="/" className="flex items-center gap-2">
            <CirclePlus size={20} />
            Create sentence
          </Link>
        </Button>
      </div>
    )
  }

  if (success) {
    return <SentenceTable people={success} />
  }
}
