import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  serial,
  doublePrecision,
  pgEnum,
} from 'drizzle-orm/pg-core'
import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import type { AdapterAccount } from 'next-auth/adapters'

const connectionString = 'postgres://postgres:postgres@localhost:5432/drizzle'
const pool = postgres(connectionString, { max: 1 })

export const db = drizzle(pool)

export const RoleEnum = pgEnum('roles', ['user', 'admin'])

export const users = pgTable('user', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name'),
  email: text('email').unique(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
  twoFactorEnabled: boolean('twoFactorEnabled').default(false),
  role: RoleEnum('roles').default('user'),
})

export const accounts = pgTable(
  'account',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccount>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
)

export const sentences = pgTable('sentences', {
  id: serial('id').primaryKey().notNull(),
  sentence: text('sentence').notNull(),
  person: text('person'),
  sentenceCount: integer('sentence_count'),
  elapsedTime: integer('elapsed_time'),
  sentencesPerMinute: doublePrecision('sentences_per_minute'),
})
