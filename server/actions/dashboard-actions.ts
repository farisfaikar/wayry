'use server'

import { db } from '@/server'
import { people, sentences, users } from '@/server/schema'
import { auth } from '@/server/auth'
import { eq, and } from 'drizzle-orm'
import { revalidatePath } from "next/cache"

export async function deletePerson(personId: number) {
  // Auth check
  const session = await auth()
  const user = session?.user

  if (!user) return { error: 'User not authenticated, so fuck off (respectfully)' }

  // Brutally unalive person from this god's green earth, you sick bastard
  const deletedPersonId = await db
    .delete(people)
    .where(
      and(
        eq(people.id, personId),
        eq(people.userId, user?.id ?? '')
      )
    )
    .returning({ deletedPersonId: people.id });

  revalidatePath('/dashboard')
  
  return { success: deletedPersonId }
}

export async function editPerson(personId: number, personName: string) {
  // Auth check
  const session = await auth()
  const user = session?.user

  if (!user) return { error: 'User not authenticated, so fuck off (respectfully)' }

  const updatedPersonId = await db
    .update(people)
    .set({ name: personName })
    .where(
      and(
        eq(people.id, personId),
        eq(people.userId, user?.id ?? '')
      )
    )
    .returning({ updatedPersonId: people.id })

  revalidatePath('/dashboard')

  return { success: updatedPersonId }
}

export async function deleteSentence(sentenceId: number) {

}

export async function editSentence(sentenceId: number) {

}

// export default async function createSentence(data: Data) {
//   const name = data.person
//   const sentence = data.sentence
//   const sentenceCount = data.sentenceCount
//   const elapsedTime = data.elapsedTime
//   const sentencesPerMinute = Number(data.sentencesPerMinute.toFixed(2))
//   const session = await auth()
//   const userEmail = session?.user?.email
  
//   const user = await db.query.users.findFirst({
//     where: eq(users.email, userEmail ?? ''),
//   })

//   const person = await db.query.people.findFirst({
//     where: eq(people.name, name)
//   })

//   if (!session) return { error: 'Please login to create sentence' }

//   if (!sentence) {
//     return { error: 'No sentences found.' }
//   }

//   if (!user) return { error: 'User not found' }

//   const insertedSentence = await db.insert(sentences).values({
//     personId: person?.id ?? 0,
//     sentence,
//     sentenceCount,
//     elapsedTime,
//     sentencesPerMinute,
//   })

//   const plainInsertedSentence = JSON.parse(JSON.stringify(insertedSentence))

//   return { success: plainInsertedSentence }
// }
