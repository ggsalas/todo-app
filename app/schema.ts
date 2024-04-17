import { smallint, pgTable, serial, varchar, timestamp, integer } from 'drizzle-orm/pg-core';

export const User = pgTable('User', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 64 }).notNull(),
  password: varchar('password', { length: 64 }).notNull(),
  timezoneOffset: smallint('timezoneOffset')
});

export const Task = pgTable('task', {
  id: serial('id').primaryKey().notNull(),
  userId: integer("author_id").references(() => User.id).notNull(),
  description: varchar('description').notNull(),
  notes: varchar('description'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  dueDate: timestamp('due_date').notNull(),
  status: serial('status').notNull()
});
