import { motion } from "framer-motion"
import { useEffect, useRef, ReactNode } from "react"

type CountButtonProps = {
  className?: string
  onClick?: () => void
  disabled?: boolean
  children?: ReactNode
}

export default function CountButton({ className, onClick, disabled, children }: CountButtonProps) {
  const btnRef = useRef<HTMLButtonElement | null>(null)
  const spanRef = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (btnRef.current && spanRef.current) {
        const { width } = btnRef.current.getBoundingClientRect()
        const offset = e.offsetX
        const left = `${(offset / width) * 100}%`

        spanRef.current.animate({ left }, { duration: 250, fill: "forwards" })
      }
    }

    const handleMouseLeave = () => {
      if (spanRef.current) {
        spanRef.current.animate({ left: "50%" }, { duration: 100, fill: "forwards" })
      }
    }

    const button = btnRef.current
    if (button) {
      button.addEventListener("mousemove", handleMouseMove)
      button.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      if (button) {
        button.removeEventListener("mousemove", handleMouseMove)
        button.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

  return (
    <motion.button
      whileTap={disabled ? { scale: 1 } : { scale: 0.985 }}
      ref={btnRef}
      className={`${className} relative flex w-full items-center justify-center overflow-hidden rounded-lg border border-neutral-800 p-10 text-lg font-medium text-white`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="pointer-events-none relative z-10 text-sm mix-blend-difference">
        Tap or click to count sentence
      </span>
      <p className="pointer-events-none z-10 text-2xl font-bold mix-blend-difference">{children}</p>
      <span
        ref={spanRef}
        className={`${disabled && "hidden"} pointer-events-none absolute left-[50%] top-[50%] h-64 w-64 -translate-x-[50%] -translate-y-[50%] rounded-full bg-neutral-100 sm:h-[30rem] sm:w-[30rem]`}
      />
    </motion.button>
  )
}
