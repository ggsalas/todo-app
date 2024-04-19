import { createUserTask } from "@/app/db";
import { redirect } from "next/navigation";
import { TaskForm } from "@/components/TaskForm";

export default async function AddTask() {
  async function createTicket(formData: FormData) {
    "use server";
    const { description, dueDate, alertFrom, notes } = Object.fromEntries(formData);

    await createUserTask({
      description: String(description),
      notes: String(notes),
      dueDate: String(dueDate),
      alertFrom: String(alertFrom) as any,
    });

    redirect("/app");
  }

  return <TaskForm onSubmit={createTicket} />;
}
