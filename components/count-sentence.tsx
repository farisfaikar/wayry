import { Button } from '@/components/ui/button'
import { useState, useEffect, useRef } from 'react'
import { Play, Pause, RotateCcw, Save } from 'lucide-react'

type CountSentenceProps = {
  className?: string
  data: {
    person: string
    sentence: string
  }
}

export default function CountSentence({ className = '', data }: CountSentenceProps) {
  const [sentenceCount, setSentenceCount] = useState(0)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [sentencesPerMinute, setSentencesPerMinute] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

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

  return (
    <div className={className}>
      <Button
        className="w-full text-wrap p-10 text-center text-3xl font-bold"
        onClick={handleButtonClick} // Use the click handler function
        disabled={!isPlaying}
      >
        {data.sentence}
      </Button>
      <div className="mt-5 flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <p className="text-neutral-500">Person</p>
          <p className="text-xl font-bold">{data.person !== '' ? data.person : <i>Unknown</i>}</p>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-neutral-500">Sentence count</p>
          <p className="text-xl font-bold">{sentenceCount}</p>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-neutral-500">Elapsed Time</p>
          <p className="text-xl font-bold">{elapsedTime} seconds</p>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-neutral-500">Sentences Per Minute</p>
          <p className="text-xl font-bold">{sentencesPerMinute.toFixed(2)}</p>
        </div>
      </div>
      <div className="mt-5 flex flex-col justify-between gap-5 sm:flex-row">
        <Button
          variant={isPlaying ? 'outline' : 'default'}
          className="flex w-full gap-2"
          onClick={togglePlaying}
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
        <Button variant="outline" className="flex w-full gap-2" onClick={resetTimer}>
          <RotateCcw /> Reset
        </Button>
        <Button variant="outline" className="flex w-full gap-2" disabled>
          <Save /> Save
        </Button>
      </div>
    </div>
  )
}
