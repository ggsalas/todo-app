import {
  smallint,
  pgTable,
  serial,
  varchar,
  integer,
  text,
  date,
} from "drizzle-orm/pg-core";

export const User = pgTable("User", {
  id: serial("id"),
  email: varchar("email", { length: 64 }).notNull().unique().primaryKey(),
  password: varchar("password", { length: 64 }).notNull(),
  timezoneOffset: smallint("timezoneOffset"),
});

export const Task = pgTable("Task", {
  id: serial("id").primaryKey(),
  authorEmail: varchar("authorEmail", { length: 64 })
    .references(() => User.email)
    .notNull(),
  description: varchar("description").notNull(),
  notes: varchar("notes"),
  createdAt: date("createdAt", { mode: "string" }).notNull().defaultNow(),
  updatedAt: date("updatedAt", { mode: "string" }).notNull().defaultNow(),
  dueDate: date("dueDate", { mode: "string" }).notNull(),
  status: text("status", { enum: ["todo", "inProgress", "done"] }).notNull(),
});
