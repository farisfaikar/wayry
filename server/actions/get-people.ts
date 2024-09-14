'use server'

import { db } from '@/server'
import { auth } from "@/server/auth"
import { users } from "@/server/schema";
import { eq } from 'drizzle-orm';
import { people } from '@/server/schema';

export default async function getPeople() {
  const session = await auth()
  const user = await db.query.users.findFirst({
    where: eq(users.email, session?.user?.email ?? ''),
  })

  if (!user) return { error: 'User not found' }
  
  const userPeople = await db.query.people.findMany({
    where: eq(people.userId, user.id),
  })

  return { success: userPeople };
}
