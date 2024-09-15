"use server"

import { db } from "@/server"
import { people, sentences, users } from "@/server/schema"
import { auth } from "@/server/auth"
import { eq, and } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function deletePerson(personId: number) {
  // Auth check
  const session = await auth()
  const user = session?.user

  if (!user) return { error: "User not authenticated, so fuck off (respectfully)" }

  // Brutally unalive person from this god's green earth, you sick bastard
  const deletedPersonId = await db
    .delete(people)
    .where(and(eq(people.id, personId), eq(people.userId, user?.id ?? "")))
    .returning({ deletedPersonId: people.id })

  revalidatePath("/dashboard")

  return { success: deletedPersonId }
}

export async function editPerson(personId: number, personName: string) {
  // Auth check
  const session = await auth()
  const user = session?.user

  if (!user) return { error: "User not authenticated, so fuck off (respectfully)" }

  const updatedPersonId = await db
    .update(people)
    .set({ name: personName })
    .where(and(eq(people.id, personId), eq(people.userId, user?.id ?? "")))
    .returning({ updatedPersonId: people.id })

  revalidatePath("/dashboard")

  return { success: updatedPersonId }
}

export async function deleteSentence(sentenceId: number) {
  // Auth check
  const session = await auth()
  const user = session?.user

  if (!user) return { error: "User not authenticated, so fuck off (respectfully)" }

  // Check if user owns the person or not
  const selectedSentence = await db.query.sentences.findFirst({
    where: eq(sentences.id, sentenceId),
    with: {
      person: true,
    },
  })

  if (!selectedSentence) return { error: "This person ain't yours fool" }

  // Mutilate the person's tongue so that others may witness and learn from their blunders
  const deletedPersonId = await db
    .delete(sentences)
    .where(and(eq(sentences.id, sentenceId), eq(sentences.personId, selectedSentence.person.id)))
    .returning({ deletedPersonId: sentences.id })

  revalidatePath("/dashboard")

  return { success: deletedPersonId }
}

export async function editSentence(sentenceId: number, sentence: string) {
  // Auth check
  const session = await auth()
  const user = session?.user

  if (!user) return { error: "User not authenticated, so fuck off (respectfully)" }

  // Check if user owns the person or not
  const selectedSentence = await db.query.sentences.findFirst({
    where: eq(sentences.id, sentenceId),
    with: {
      person: true,
    },
  })

  if (!selectedSentence) return { error: "This person ain't yours fool" }

  const updatedSentenceId = await db
    .update(sentences)
    .set({ sentence })
    .where(and(eq(sentences.id, sentenceId), eq(sentences.personId, selectedSentence.person.id)))
    .returning({ updatedPersonId: sentences.id })

  revalidatePath("/dashboard")

  return { success: updatedSentenceId }
}
