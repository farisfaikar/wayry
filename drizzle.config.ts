import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'

config({ path: '.env.local' })

export default defineConfig({
  schema: './server/schema.ts',
  out: './server/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSGRES_URL!,
  },
})
