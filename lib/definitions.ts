import { Task, User } from '../app/schema';

export type User = typeof User.$inferSelect
export type Task = typeof Task.$inferSelect
