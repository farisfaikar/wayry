import CountSentence from '@/components/count-sentence'
import { SessionProvider } from 'next-auth/react'

export default function CountPage() {
  return (
    <>
      <h1 className="flex justify-center p-5 text-center text-4xl font-extrabold">
        Why Are You Repeating Yourself?
      </h1>

      <SessionProvider>
        <CountSentence />
      </SessionProvider>
    </>
  )
}
