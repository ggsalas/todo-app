import { Task } from "@/components/TaskItem/Task";
import { TAGS, cacheWithUser } from "@/lib/cacheWithUser";
import { GET_TASKS_PERIODD, Task as TaskType } from "@/lib/definitions";
import { getUserTasks } from "@/lib/services/getUserTasks";

type AppPageProps = {
  params: {
    period: string;
  };
};

export default async function AppPage({ params }: AppPageProps) {
  const period = params.period;

  if (!Object.keys(GET_TASKS_PERIODD).includes(period)) {
    throw new Error("Invalid period for display tasks");
  }

  const tasks: TaskType[] = await cacheWithUser(
    (user) => getUserTasks(user, period as GET_TASKS_PERIODD),
    [TAGS.userTasks, `${TAGS.userTasks}-period-${period}`]
  );

  return (
    <>
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </>
  );
}
