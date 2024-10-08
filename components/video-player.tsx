"use client"

import { useRef, useState } from "react"
import { Play, Pause } from "lucide-react"

export default function VideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        videoRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  return (
    <div className="relative mt-5 flex justify-center">
      <video ref={videoRef} src={src} className="w-full" playsInline />
      <button
        onClick={handlePlayPause}
        className={`absolute inset-0 flex items-center justify-center bg-black ${isPlaying ? "bg-opacity-0" : "bg-opacity-50"} text-6xl font-bold text-white`}
      >
        {isPlaying ? <Pause size={48} className="opacity-0" /> : <Play size={48} />}
      </button>
    </div>
  )
}
