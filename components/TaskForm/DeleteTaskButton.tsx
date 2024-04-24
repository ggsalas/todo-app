"use client";

import { SubmitButton } from "../SubmitButton";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Task as TaskType } from "@/lib/definitions";

type DeleteTaskButtonProps = {
  task?: TaskType;
  onDeleteTask?: (formData: FormData) => void;
  redirectRoute: string;
};

export function DeleteTaskButton({
  task,
  onDeleteTask,
  redirectRoute,
}: DeleteTaskButtonProps) {
  if (!task) return <div />;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete Task</Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <form
          action={onDeleteTask}
          className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2"
        >
          <input hidden name="redirectRoute" defaultValue={redirectRoute} />
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <SubmitButton>Delete</SubmitButton>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
