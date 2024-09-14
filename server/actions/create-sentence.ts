'use server'

import { db } from '@/server'
import { sentences, users } from '@/server/schema'
import { auth } from '@/server/auth'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

type Data = {
  person: string
  sentence: string
  sentenceCount: number
  elapsedTime: number
  sentencesPerMinute: number
}

export default async function createSentence(data: Data) {
  const person = data.person
  const sentence = data.sentence
  const sentenceCount = data.sentenceCount
  const elapsedTime = data.elapsedTime
  const sentencesPerMinute = Number(data.sentencesPerMinute.toFixed(2))
  const session = await auth()
  const userEmail = session?.user?.email
  const user = await db.query.users.findFirst({
    where: eq(users.email, userEmail ?? ''),
  })

  if (!session) return { error: 'Please login to create sentence' }

  if (!sentence) {
    return { error: 'No sentences found.' }
  }

  if (!user) return { error: 'User not found' }

  const insertedSentence = await db.insert(sentences).values({
    userId: user.id,
    sentence,
    person,
    sentenceCount,
    elapsedTime,
    sentencesPerMinute,
  })

  const plainInsertedSentence = JSON.parse(JSON.stringify(insertedSentence))

  revalidatePath('/dashboard')

  return { success: plainInsertedSentence }
}
