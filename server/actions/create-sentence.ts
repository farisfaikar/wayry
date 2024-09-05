'use server'

import { db } from '@/server'
import { sentences } from '../schema'

type Data = {
  person: string,
  sentence: string,
  sentenceCount: number,
  elapsedTime: number,
  sentencesPerMinute: number,
}

export default async function createSentence(data: Data) {
  const person = data.person
  const sentence = data.sentence
  const sentenceCount = data.sentenceCount
  const elapsedTime = data.elapsedTime
  const sentencesPerMinute = data.sentencesPerMinute
  
  if (!sentence) {
    return { error: 'No sentences found.' }
  }
  
  const insertedSentence = await db.insert(sentences).values({
    sentence, 
    person,
    sentenceCount: sentenceCount.toString(), 
    elapsedTime: elapsedTime.toString(), 
    sentencesPerMinute: sentencesPerMinute.toString()
  })

  const plainInsertedSentence = JSON.parse(JSON.stringify(insertedSentence));

  return { success: plainInsertedSentence };
}
