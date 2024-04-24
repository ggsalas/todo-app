import { createUserTask } from "@/app/db";
import { redirect } from "next/navigation";
import { TaskForm } from "@/components/TaskForm/TaskForm";

type AddTaskProps = {
  searchParams: {
    redirectRoute: string;
  };
}

export default async function AddTask({ searchParams }: AddTaskProps) {
  async function createTask(formData: FormData) {
    "use server";
    const { description, dueDate, alertFrom, notes, redirectRoute } =
      Object.fromEntries(formData);

    await createUserTask({
      description: String(description),
      notes: String(notes),
      dueDate: String(dueDate),
      alertFrom: String(alertFrom) as any,
    });

    redirect(String(redirectRoute) || "/app");
  }

  return (
    <TaskForm
      onSubmit={createTask}
      redirectRoute={searchParams.redirectRoute}
    />
  );
}
