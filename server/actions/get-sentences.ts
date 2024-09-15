"use server"

import { db } from "@/server"
import { auth } from "@/server/auth"
import { sentences, users } from "@/server/schema"
import { eq } from "drizzle-orm"

export default async function getSentences() {
  const session = await auth()
  const user = await db.query.users.findFirst({
    where: eq(users.email, session?.user?.email ?? ""),
  })

  if (!user) return { error: "User not found" }

  const userSentences = await db.query.sentences.findMany({
    where: eq(sentences.userId, user.id),
  })

  if (!userSentences) {
    return { error: "No sentences found" }
  }

  return { success: userSentences }
}
