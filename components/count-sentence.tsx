'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { useState, useEffect, useRef } from 'react'
import { Play, Pause, RotateCcw, Save, Loader } from 'lucide-react'
import createSentence from '@/server/actions/create-sentence'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import CountButton from './count-button'
import { MoveLeft } from 'lucide-react'

type CountSentenceProps = {
  className?: string
}

const formSchema = z.object({
  sentence: z.string().min(1, 'Sentence is required.'),
  person: z.string().nullable(),
  sentenceCount: z.number().nullable(),
  elapsedTime: z.number().nullable(),
  sentencesPerMinute: z.number().nullable(),
})

export default function CountSentence({ className = '' }: CountSentenceProps) {
  const [sentenceCount, setSentenceCount] = useState(0)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [sentencesPerMinute, setSentencesPerMinute] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const sentence = searchParams.get('sentence') || ''
  const person = searchParams.get('person') || ''
  const { data: session, status } = useSession()

  // Start the timer when the component mounts
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1)
      }, 1000) // Update every second
    }

    // Cleanup the interval on component unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying])

  // Calculate sentences per minute
  useEffect(() => {
    if (elapsedTime > 0) {
      const rate = (sentenceCount / elapsedTime) * 60
      setSentencesPerMinute(rate)
    }
  }, [sentenceCount, elapsedTime])

  // Function to handle button click
  const handleButtonClick = () => {
    setSentenceCount((prevCount) => prevCount + 1)
  }

  const togglePlaying = () => {
    setIsPlaying(!isPlaying)
  }

  const resetTimer = () => {
    setElapsedTime(0)
    setSentenceCount(0)
    setSentencesPerMinute(0)
    setIsPlaying(false)
  }

  // Define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sentence: '',
      person: null,
    },
  })

  const data = {
    sentence,
    person,
  }
  
  // Define submit handler
  const handleCreateSentence = async () => {
    setIsLoading(true)
    setIsPlaying(false)

    const newData = {
      person: data.person,
      sentence: data.sentence,
      sentenceCount,
      elapsedTime,
      sentencesPerMinute,
    }

    const response = await createSentence(newData)

    setIsLoading(false)

    if (response.success) {
      router.push('/dashboard')
    } else {
      console.error('Failed to create sentence: ', response.error)
    }
  }

  const goToHome = () => {
    router.push('/')
  }

  return (
    <div className={className}>
      <CountButton
        className="w-full text-wrap p-10 pt-7 text-center text-3xl font-bold h-full flex flex-col gap-2"
        onClick={handleButtonClick}
        disabled={!isPlaying}
      >
        {data.sentence}
      </CountButton>
      <div className="mt-5 flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm text-neutral-500">Person</p>
          <p className="text-lg font-bold">{data.person !== '' ? data.person : <i>Unknown</i>}</p>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm text-neutral-500">Sentence count</p>
          <p className="text-lg font-bold">{sentenceCount}</p>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm text-neutral-500">Elapsed time</p>
          <p className="text-lg font-bold">{elapsedTime} seconds</p>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm text-neutral-500">Sentences per minute</p>
          <p className="text-lg font-bold">{sentencesPerMinute.toFixed(2)}</p>
        </div>
      </div>
      <div className="mt-5 flex flex-col justify-between gap-5 sm:flex-row">
        <Button
          variant={isPlaying ? 'outline' : 'default'}
          className="flex w-full gap-2"
          onClick={togglePlaying}
          disabled={isLoading}
        >
          {isPlaying ? (
            <>
              <Pause /> Pause
            </>
          ) : (
            <>
              <Play /> {elapsedTime === 0 ? 'Start' : 'Continue'}
            </>
          )}
        </Button>
        <Button
          variant="outline"
          onClick={resetTimer}
          className="flex w-full gap-2"
          disabled={isLoading}
        >
          <RotateCcw /> Reset
        </Button>
        <Button
          variant="outline"
          onClick={handleCreateSentence}
          className="flex w-full gap-2"
          disabled={isLoading || !session || !isPlaying}
        >
          {isLoading ? (
            <>
              <Loader className="animate-spin" /> Saving...
            </>
          ) : (
            <>
              <Save /> 
              {session ? 'Save' : 'Login to save'}
            </>
          )}
        </Button>
      </div>
      <Button variant="link" className="mt-5 flex gap-2" onClick={goToHome}>
        <MoveLeft /> Back
      </Button>
    </div>
  )
}
