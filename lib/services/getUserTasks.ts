import { sql } from "drizzle-orm";
import { AuthUser, Task as TaskType } from "@/lib/definitions";
import { db } from "@/app/db";
import { GET_TASKS_PERIODD } from "@/lib/definitions";
import { getISODate } from "../utils";
import { add } from "date-fns";

function getDateRange(period: GET_TASKS_PERIODD) {
  let start;
  let end;
  const today = getISODate(new Date());
  const tomorrow = getISODate(add(new Date(), { days: 1 }));
  const plus7days = getISODate(add(new Date(), { days: 7 }));
  const plus8days = getISODate(add(new Date(), { days: 8 }));
  const nextYear = getISODate(add(new Date(), { years: 1 }));

  if (period === GET_TASKS_PERIODD.day) {
    start = today;
    end = today;
  }

  if (period === GET_TASKS_PERIODD.week) {
    start = tomorrow;
    end = plus7days;
  }

  if (period === GET_TASKS_PERIODD.year) {
    start = plus8days;
    end = nextYear;
  }

  return {
    start,
    end,
    endNextWeek: plus7days,
  };
}

export async function getUserTasks(user: AuthUser, period: GET_TASKS_PERIODD) {
  const { start, end, endNextWeek } = getDateRange(period);
  let sqlString: ReturnType<typeof sql>;

  console.log(' executing request')
  if (period === GET_TASKS_PERIODD.day) {
    sqlString = sql`
      select * 
      from "Task" 
      where "authorEmail" = ${user.email} 
        and "dueDate" >= ${start} 
        and "dueDate" <= (case when "alertFrom" = 'day' then ${end}::date else ${endNextWeek}::date end)
      order by "dueDate"
    `;
  } else {
    sqlString = sql`
      select * 
      from "Task" 
      where "authorEmail" = ${user.email} 
        and "dueDate" >= ${start} 
        and "dueDate" <= ${end}
      order by "dueDate"
    `;
  }

  const tasks: TaskType[] = await db.execute(sqlString);

  return tasks;
}
