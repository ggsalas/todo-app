import { drizzle } from "drizzle-orm/postgres-js";
import { eq, sql } from "drizzle-orm";
import postgres from "postgres";
import { genSaltSync, hashSync } from "bcrypt-ts";
import * as schema from "./schema";
import { AuthUser, Task, Task as TaskType } from "@/lib/definitions";
import { revalidateTag } from "next/cache";
import { TAGS, getSessionUser } from "@/lib/cacheWithUser";

export let client = postgres(`${process.env.POSTGRES_URL}`);
export let db = drizzle(client, { schema });

/********************************************************************************
 * Registration
 ********************************************************************************/
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

/********************************************************************************
 * Handle data
 ********************************************************************************/
export async function getUserTask(taskId: number, user: AuthUser) {
  const task: TaskType[] = await db.execute(
    sql`select * from "Task" where "authorEmail" = ${user.email} AND id = ${taskId}`
  );

  return task[0];
}

export async function createUserTask({
  description,
  dueDate,
  alertFrom,
  notes,
}: Partial<Task>) {
  const user = await getSessionUser();
  if (!description || !dueDate || !alertFrom) {
    throw new Error("missing required form fields");
  }

  const sqlString = sql`
    insert into "Task"("authorEmail", description, "dueDate", "alertFrom", notes)
      values(${user.email}, ${description}, ${dueDate}, ${alertFrom}, ${notes ?? ""
    }); 
  `;
  const newTask: TaskType[] = await db.execute(sqlString);

  revalidateTag(TAGS.userTasks);
  return newTask;
}

export async function editUserTask({
  id,
  notes = "",
  description,
  dueDate,
  alertFrom,
}: Partial<Task>) {
  const user = await getSessionUser();
  if (!id || !description || !dueDate || !alertFrom) {
    throw new Error("missing required form fields");
  }

  const sqlString = sql`
    update "Task"
      set 
        description = ${description},
        notes = ${notes},
        "dueDate" = ${dueDate},
        "alertFrom" = ${alertFrom},
        "updatedAt" = ${new Date()}
    where "authorEmail" = ${user.email} and id = ${id}
  `;
  const newTask: TaskType[] = await db.execute(sqlString);

  revalidateTag(TAGS.userTasks);
  return newTask;
}

export async function editUserTaskStatus({ id, status }: Partial<Task>) {
  const user = await getSessionUser();
  if (!status || !id) {
    throw new Error("missing required form fields");
  }

  const sqlString = sql`
    update "Task"
      set 
        status = ${status},
        "updatedAt" = ${new Date()}
    where "authorEmail" = ${user.email} and id = ${id}
  `;
  const newTask: TaskType[] = await db.execute(sqlString);

  revalidateTag(TAGS.userTasks);
  return newTask;
}

export async function deleteUserTask({ id }: Partial<Task>) {
  const user = await getSessionUser();
  if (!id) {
    throw new Error("missing required form fields");
  }

  const sqlString = sql`
    delete from "Task"
    where id = ${id} and "authorEmail" = ${user.email}
  `;
  const deletedTask: TaskType[] = await db.execute(sqlString);

  revalidateTag(TAGS.userTasks);
  return deletedTask;
}
