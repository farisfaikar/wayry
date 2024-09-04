'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import CountSentence from '@/components/count-sentence'
import { Button } from '@/components/ui/button'
import { MoveLeft } from 'lucide-react'

export default function CountPage() {
  const searchParams = useSearchParams()
  const sentence = searchParams.get('sentence') || ''
  const person = searchParams.get('person') || ''
  const router = useRouter()

  // Prepare the data object for CountSentence
  const data = {
    sentence,
    person,
  }

  const goToHome = () => {
    router.push('/')
  }

  return (
    <>
      <h1 className="flex justify-center p-5 text-center text-4xl font-extrabold">
        Why Are You Repeating Yourself?
      </h1>
      <CountSentence data={data} />
      <Button variant="link" className="mt-5 flex gap-2" onClick={goToHome}>
        <MoveLeft /> Back
      </Button>
    </>
  )
}
