'use server'

import { db } from '@/server'
import { people, sentences, users } from '@/server/schema'
import { auth } from '@/server/auth'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export default async function createPerson(data: { name: string }) {
  const name = data.name
  const session = await auth()
  const userEmail = session?.user?.email
  const user = await db.query.users.findFirst({
    where: eq(users.email, userEmail ?? ''),
  })

  const userId = user?.id ?? ''

  const personAlreadyExists = await db.query.people.findFirst({
    where: eq(people.name, name)
  })

  if (personAlreadyExists) return { error: 'This person has already been kidnapped :(' }
  
  const insertedPerson = await db.insert(people).values({
    userId,
    name,
  })

  const plainInsertedPerson = JSON.parse(JSON.stringify(insertedPerson))

  // This is really fucking bad btw, please move the create-sentence component elsewhere
  revalidatePath('/')
  
  return { success: plainInsertedPerson }
}
