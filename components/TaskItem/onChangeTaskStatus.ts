"use server";

import { redirect } from "next/navigation";
import { editUserTaskStatus } from "@/app/db";
import { Task } from "@/lib/definitions";

export async function onChangeTaskStatus(formData: FormData) {
  const { status, id } = Object.fromEntries(formData);

  await editUserTaskStatus({
    status: status as Task["status"],
    id: Number(id),
  });

  redirect("/app");
}
