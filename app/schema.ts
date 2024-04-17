import { smallint, pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const User = pgTable('User', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 64 }).notNull(),
  password: varchar('password', { length: 64 }).notNull(),
  timezoneOffset: smallint('timezoneOffset')
});
