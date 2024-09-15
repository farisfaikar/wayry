import { Button } from "@/components/ui/button"
import Link from "next/link"

type BackButtonProps = {
  href: string
  label: string
}

export default function BackButton({ href, label }: BackButtonProps) {
  return (
    <Button variant="link">
      <Link href={href} aria-label={label}>
        {label}
      </Link>
    </Button>
  )
}
