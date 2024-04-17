import postgres from "postgres";
import { db } from "../app/db";
import { migrate } from "drizzle-orm/postgres-js/migrator";

const sql = postgres(`${process.env.POSTGRES_URL}`, { max: 1 });
await migrate(db, { migrationsFolder: "drizzle" });
await sql.end();
