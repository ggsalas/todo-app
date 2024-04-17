import { drizzle } from "drizzle-orm/postgres-js";
import { eq } from "drizzle-orm";
import postgres from "postgres";
import { genSaltSync, hashSync } from "bcrypt-ts";
import * as schema from "./schema";

export let client = postgres(`${process.env.POSTGRES_URL}`);
export let db = drizzle(client, { schema });

export async function getUser(email: string) {
  const user = await db
    .select()
    .from(schema.User)
    .where(eq(schema.User.email, email));
  return user;
}

export async function createUser(email: string, password: string, timezoneOffset: number) {
  let salt = genSaltSync(10);
  let hash = hashSync(password, salt);

  return await db.insert(schema.User).values({ email, password: hash, timezoneOffset });
}
