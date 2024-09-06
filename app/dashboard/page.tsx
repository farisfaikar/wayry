import getSentences from '@/server/actions/get-sentences'
import createSentence from '@/server/actions/create-sentence'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CirclePlus } from 'lucide-react'

export const revalidate = 0 // Disable caching in Next.js

export default async function DashboardPage() {
  const { error, success } = await getSentences()

  if (error) {
    throw new Error(error)
  }

  // Check if success is empty
  if (success && success.length === 0) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center h-full">
        <h2 className="text-xl font-bold">No Sentences Found :(</h2>
        <p className="text-neutral-500">There are currently no sentences available.</p>
        <Button variant="outline" className="mt-2">
          <Link href="/" className="flex gap-2 items-center"><CirclePlus size={20} />Create sentence</Link>
        </Button>
      </div>
    )
  }
  
  if (success) {
    return (
      <Accordion type="single" collapsible className="w-full">
        {success.map((sentence) => (
          <AccordionItem key={sentence.id} value={`sentence-${sentence.id}`}>
            <AccordionTrigger>
              {sentence.person !== '' ? sentence.person : <i>Unknown</i>}
            </AccordionTrigger>
            <AccordionContent>
              <div>
                <div className="flex items-center justify-between">
                <span className="text-neutral-500">Sentence</span>
                  <span className="text-xl font-bold">{sentence.sentence}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">Sentence count</span>
                  <span className="text-xl font-bold">{sentence.sentenceCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">Elapsed time</span>
                  <span className="text-xl font-bold">{sentence.elapsedTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">Sentences per minute</span>
                  <span className="text-xl font-bold">{sentence.sentencesPerMinute?.toFixed(2)}</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    )
  }
}
