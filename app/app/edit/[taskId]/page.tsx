import { createUserTask, editUserTask, getUserTask } from "@/app/db";
import { redirect } from "next/navigation";
import { subDays } from "date-fns/subDays";
import { TaskForm } from "@/components/TaskForm";

type AddTaskProps = {
  params: {
    taskId: string;
  };
};

export default async function EditTask({ params }: AddTaskProps) {
  const task = await getUserTask(Number(params.taskId));

  async function onEditUserTask(formData: FormData) {
    "use server";
    const { description, dueDate, alertFrom, notes } = Object.fromEntries(formData);

    await editUserTask({
      id: Number(task.id),
      description: String(description),
      notes: String(notes),
      dueDate: String(dueDate),
      alertFrom: String(alertFrom) as any,
    });

    redirect("/app");
  }

  if (!task) throw new Error("No task found to edit");

  return <TaskForm onSubmit={onEditUserTask} task={task} />;
}
