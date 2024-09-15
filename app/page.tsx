import SentenceForm from "@/components/sentence-form"
import { auth } from "@/server/auth"

export default async function HomePage() {
  const session = await auth()

  return (
    <>
      <h1 className="flex justify-center p-5 text-center text-4xl font-extrabold">
        Why Are You Repeating Yourself?
      </h1>
      <SentenceForm session={session} />
    </>
  )
}
