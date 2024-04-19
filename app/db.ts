import { drizzle } from "drizzle-orm/postgres-js";
import { eq, sql } from "drizzle-orm";
import postgres from "postgres";
import { genSaltSync, hashSync } from "bcrypt-ts";
import * as schema from "./schema";
import { auth } from "app/auth";
import { Task, Task as TaskType } from "@/lib/definitions";

export let client = postgres(`${process.env.POSTGRES_URL}`);
export let db = drizzle(client, { schema });

// Registration
export async function getUser(email: string) {
  const user = await db
    .select()
    .from(schema.User)
    .where(eq(schema.User.email, email));

  return user[0];
}

export async function createUser(
  email: string,
  password: string,
  timezoneOffset: number
) {
  let salt = genSaltSync(10);
  let hash = hashSync(password, salt);

  return await db
    .insert(schema.User)
    .values({ email, password: hash, timezoneOffset });
}

// Handle data
export async function getUserTasks() {
  let session = await auth();
  const userEmail = session?.user?.email;
  if (!userEmail) throw new Error("missing user email for get tasks");

  const tasks: TaskType[] = await db.execute(
    sql`select * from "Task" where "authorEmail" = ${userEmail}`
  );

  return tasks;
}

export async function getUserTask(taskId: number) {
  let session = await auth();
  const userEmail = session?.user?.email;
  if (!userEmail) throw new Error("missing user email for get tasks");

  const task: TaskType[] = await db.execute(
    sql`select * from "Task" where "authorEmail" = ${userEmail} AND id = ${taskId}`
  );

  return task[0];
}

export async function createUserTask({
  description,
  dueDate,
  alertFrom,
  notes,
}: Partial<Task>) {
  let session = await auth();
  const userEmail = session?.user?.email;
  if (!userEmail) throw new Error("missing user email for create task");
  if (!description || !dueDate || !alertFrom)
    throw new Error("missing required form fields");

  const newTask: TaskType[] = await db.execute(
    sql`
      insert into "Task"("authorEmail", description, "dueDate", "alertFrom", notes)
        values(${userEmail}, ${description}, ${dueDate}, ${alertFrom}, ${
      notes ?? ""
    }); 
    `
  );

  return newTask;
}

export async function editUserTask({
  id,
  notes = "",
  description,
  dueDate,
  alertFrom,
}: Partial<Task>) {
  let session = await auth();
  const userEmail = session?.user?.email;
  if (!userEmail) throw new Error("missing user email for create task");
  if (!description || !dueDate || !alertFrom || !id)
    throw new Error("missing required form fields");

  const sqlString = sql`
      update "Task"
        set 
          description = ${description},
          notes = ${notes},
          "dueDate" = ${dueDate},
          "alertFrom" = ${alertFrom},
          "updatedAt" = ${new Date()}
      where "authorEmail" = ${userEmail} and id = ${id}
    `;
  console.log(sqlString);
  const newTask: TaskType[] = await db.execute(sqlString);

  return newTask;
}
