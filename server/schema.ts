import { pgTable, serial, text } from 'drizzle-orm/pg-core'

export const sentences = pgTable('sentences', {
  id: serial('id').primaryKey().notNull(),
  sentence: text('sentence').notNull(),
  person: text('person'),
})
