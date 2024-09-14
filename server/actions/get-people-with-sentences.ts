'use server'

import { db } from '@/server'
import { auth } from "@/server/auth"
import { users } from "@/server/schema";
import { eq } from 'drizzle-orm';
import { people } from '@/server/schema';

export default async function getPeopleWithSentences() {
  const session = await auth()
  const user = await db.query.users.findFirst({
    where: eq(users.email, session?.user?.email ?? ''),
  })

  if (!user) return { error: 'User not found' }
  
  const peopleWithSentences = await db.query.people.findMany({
    where: eq(people.userId, user.id),
    with: {
      sentences: true
    },
  })

  if (peopleWithSentences.length === 0) return { success: [] }

  return { success: peopleWithSentences };
}
