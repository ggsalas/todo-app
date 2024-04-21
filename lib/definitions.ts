import { Task, User } from '../app/schema';


export type User = typeof User.$inferSelect
export type Task = typeof Task.$inferSelect

export type { User as AuthUser } from 'next-auth/types';
