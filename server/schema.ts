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
import { relations } from 'drizzle-orm'

const connectionString = 'postgres://postgres:postgres@localhost:5432/drizzle'

const pool = postgres(connectionString, { max: 1 })

export const db = drizzle(pool)

export const RoleEnum = pgEnum('roles', ['user', 'admin'])

// --- Table Schemas --- //
export const users = pgTable('user', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name'),
  email: text('email').unique(),
  password: text('password'),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
  twoFactorEnabled: boolean('two_factor_enabled').default(false),
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

export const emailTokens = pgTable(
  'email_tokens',
  {
    id: text('id')
      .notNull()
      .$defaultFn(() => crypto.randomUUID()),
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
    id: text('id')
      .notNull()
      .$defaultFn(() => crypto.randomUUID()),
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
    id: text('id')
      .notNull()
      .$defaultFn(() => crypto.randomUUID()),
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

export const people = pgTable('people', {
  id: serial('id').primaryKey().notNull(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
})

export const sentences = pgTable('sentences', {
  id: serial('id').primaryKey().notNull(),
  personId: serial('person_id').references(() => people.id, { onDelete: 'cascade' }),
  sentence: text('sentence').notNull(),
  person: text('person'),
  sentenceCount: integer('sentence_count'),
  elapsedTime: integer('elapsed_time'),
  sentencesPerMinute: doublePrecision('sentences_per_minute'),
})

// --- Table Healthy (and hopefully non-toxic) Relationship Goals --- //
export const usersRelations = relations(users, ({ many }) => ({
  people: many(people, { relationName: 'people' }),
}))

export const peopleRelations = relations(people, ({ one, many }) => ({
  user: one(users, {
    fields: [people.userId],
    references: [users.id],
    relationName: 'user'
  }),
  sentences: many(sentences)
}))

export const sentencesRelations = relations(sentences, ({ one }) => ({
  person: one(people, {
    fields: [sentences.personId],
    references: [people.id],
    relationName: 'person',
  })
}))
