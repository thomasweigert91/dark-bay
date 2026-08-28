import { betterAuth } from "better-auth";
import { bearer } from "better-auth/plugins";
import Database from "better-sqlite3";
import type { Database as DatabaseType } from 'better-sqlite3'

export const auth = betterAuth({
  database: new Database('data/dark-bay.sqlite'),
  plugins: [bearer()],
  emailAndPassword: {
    enabled: true,
  },
   advanced: {
    crossSubDomainCookies: {
      enabled: false,
    },
  },
});