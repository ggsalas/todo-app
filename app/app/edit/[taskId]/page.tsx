import { deleteUserTask, editUserTask, getUserTask } from "@/app/db";
import { redirect } from "next/navigation";
import { TaskForm } from "@/components/TaskForm/TaskForm";
import { TAGS, cacheWithUser } from "@/lib/cacheWithUser";

type AddTaskProps = {
  params: {
    taskId: string;
  };
  searchParams: {
    redirectRoute: string;
  }
};

export default async function EditTask({ params, searchParams }: AddTaskProps) {
  const task = await cacheWithUser(
    (user: any) => getUserTask(Number(params.taskId), user),
    [TAGS.userTasks]
  );

  async function onEditUserTask(formData: FormData) {
    "use server";
    const { description, dueDate, alertFrom, notes, redirectRoute } =
      Object.fromEntries(formData);

    await editUserTask({
      id: Number(task.id),
      description: String(description),
      notes: String(notes),
      dueDate: String(dueDate),
      alertFrom: String(alertFrom) as any,
    });

    redirect(String(redirectRoute) || "/app");
  }

  async function onDeleteUserTask(formData: FormData) {
    "use server";

    const { redirectRoute } = Object.fromEntries(formData);

    await deleteUserTask({ id: Number(task.id) });

    redirect(String(redirectRoute) || "/app");
  }

  if (!task) throw new Error("No task found to edit");

  return (
    <TaskForm
      onSubmit={onEditUserTask}
      task={task}
      onDeleteTask={onDeleteUserTask}
      redirectRoute={searchParams.redirectRoute}
    />
  );
}
