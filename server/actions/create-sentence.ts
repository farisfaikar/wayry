"use server"

import { db } from "@/server"
import { people, sentences, users } from "@/server/schema"
import { auth } from "@/server/auth"
import { eq } from "drizzle-orm"

type Data = {
  person: string
  sentence: string
  sentenceCount: number
  elapsedTime: number
  sentencesPerMinute: number
}

export default async function createSentence(data: Data) {
  const name = data.person
  const sentence = data.sentence
  const sentenceCount = data.sentenceCount
  const elapsedTime = data.elapsedTime
  const sentencesPerMinute = Number(data.sentencesPerMinute.toFixed(2))
  const session = await auth()
  const userEmail = session?.user?.email

  const user = await db.query.users.findFirst({
    where: eq(users.email, userEmail ?? ""),
  })

  const person = await db.query.people.findFirst({
    where: eq(people.name, name),
  })

  if (!session) return { error: "Please login to create sentence" }

  if (!sentence) {
    return { error: "No sentences found." }
  }

  if (!user) return { error: "User not found" }

  const insertedSentence = await db.insert(sentences).values({
    personId: person?.id ?? 0,
    sentence,
    sentenceCount,
    elapsedTime,
    sentencesPerMinute,
  })

  const plainInsertedSentence = JSON.parse(JSON.stringify(insertedSentence))

  return { success: plainInsertedSentence }
}
