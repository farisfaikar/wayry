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
import { relations } from "drizzle-orm"

const connectionString = 'postgres://postgres:postgres@localhost:5432/drizzle'

const pool = postgres(connectionString, { max: 1 })

export const db = drizzle(pool)

export const RoleEnum = pgEnum('roles', ['user', 'admin'])

export const users = pgTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name'),
  email: text('email').unique(),
  password: text('password'),
  emailVerified: timestamp('email_verified', { mode: 'date' }),
  image: text('image'),
  twoFactorEnabled: boolean('two_factor_enabled').default(false),
  role: RoleEnum('roles').default('user'),
})

export const accounts = pgTable(
  'accounts',
  {
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccount>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('provider_account_id').notNull(),
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
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
  sentence: text('sentence').notNull(),
  person: text('person'),
  sentenceCount: integer('sentence_count'),
  elapsedTime: integer('elapsed_time'),
  sentencesPerMinute: doublePrecision('sentences_per_minute'),
})

export const emailTokens = pgTable(
  'email_tokens',
  {
    id: text('id').notNull().$defaultFn(() => crypto.randomUUID()),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
    email: text('email').notNull(),
  },
  (emailToken) => ({
    compositePk: primaryKey({
      columns: [emailToken.id, emailToken.token],
    }),
  }),
)

export const passwordResetTokens = pgTable(
  'password_reset_tokens',
  {
    id: text('id').notNull().$defaultFn(() => crypto.randomUUID())  ,
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
    email: text('email').notNull(),
  },
  (emailToken) => ({
    compositePk: primaryKey({
      columns: [emailToken.id, emailToken.token],
    }),
  }),
)

export const twoFactorTokens = pgTable(
  'two_factor_tokens',
  {
    id: text('id').notNull().$defaultFn(() => crypto.randomUUID())  ,
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
    email: text('email').notNull(),
  },
  (emailToken) => ({
    compositePk: primaryKey({
      columns: [emailToken.id, emailToken.token],
    }),
  }),
)

export const sentenceRelations = relations(sentences, ({ one }) => ({
  user: one(users, {
    fields: [sentences.userId],
    references: [users.id],
    relationName: 'user',
  }),
}))

export const userRelations = relations(users, ({ many }) => ({
  sentences: many(sentences, { relationName: 'sentences' }),
}))
