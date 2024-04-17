import { Task, User } from '../app/schema';

// Examples:
// export type User = typeof users.$inferSelect; // return type when queried
// export type NewUser = typeof users.$inferInsert; // insert type

export type User = typeof User.$inferSelect
export type Task = Omit<typeof Task.$inferSelect, "createdAt" | "updatedAt" | "dueDate"> & {
  createdAt: string;
  updatedAt: string;
  dueDate: string;
}
