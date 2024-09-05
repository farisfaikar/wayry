import { pgTable, serial, text } from 'drizzle-orm/pg-core'

export const sentences = pgTable('sentences', {
  id: serial('id').primaryKey().notNull(),
  sentence: text('sentence').notNull(),
  person: text('person'),
  sentenceCount: text('sentence_count'),
  elapsedTime: text('elapsed_time'),
  sentencesPerMinute: text('sentences_per_minute'),
})
