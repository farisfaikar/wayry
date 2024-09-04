'use server'

import { db } from '@/server'

export default async function getSentences() {
  const sentences = await db.query.sentences.findMany()

  if (!sentences) {
    return { error: 'No sentences found.' }
  }

  return { success: sentences }
}