import { auth } from "@/app/auth";
import { Task as TaskType } from "@/lib/definitions";
import { db } from "../../db";
import { sql } from "drizzle-orm";

export async function GET(_request: Request) {
    let session = await auth();
  console.log('...................... session: ', session)
    const userEmail = session?.user?.email;
    if (!userEmail) throw new Error("missing user email for get tasks");

    const tasks: TaskType[] = await db.execute(
      sql`select * from "Task" where "authorEmail" = ${userEmail} order by "dueDate"`
    );

    return Response.json(tasks);
}

// function requestHandler(_request: Request): Response {
//   return Response.json({ message: "Hello from Next.js!" });
// }
//
// export { requestHandler as GET };
