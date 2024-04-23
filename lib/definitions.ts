import { Task, User } from '../app/schema';


export type User = typeof User.$inferSelect
export type Task = typeof Task.$inferSelect

export type { User as AuthUser } from 'next-auth/types';

export enum GET_TASKS_PERIODD {
  day = 'day',
  week = 'week',
  year = 'year'
};
