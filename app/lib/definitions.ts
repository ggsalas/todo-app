import { User } from '../schema';

// Examples:
// export type User = typeof users.$inferSelect; // return type when queried
// export type NewUser = typeof users.$inferInsert; // insert type

export type User = typeof User.$inferSelect

