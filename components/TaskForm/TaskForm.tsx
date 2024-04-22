import { Task as TaskType } from "@/lib/definitions";
import Link from "next/link";
import { ChevronLeftIcon } from "@/components/ui/icons/ChevronLeftIcon";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "@/components/SubmitButton";
import { InputCalendar } from "@/components/ui/InputCalendar/InputCalendar";
import { subDays } from "date-fns/subDays";
import { AlertFromButtons } from "./AlertFromButtons";
import { DeleteTaskButton } from "./DeleteTaskButton";

type TaskFormProps = {
  task?: TaskType;
  onSubmit: (formData: FormData) => void;
  onDeleteTask?: (formData: FormData) => void;
};

export function TaskForm({ task, onSubmit, onDeleteTask }: TaskFormProps) {
  const disabledDays = [
    { from: new Date("2000-01-01"), to: subDays(new Date(), 1) },
  ];

  return (
    <div className="flex flex-col w-full min-h-svh relative">
      <header className="h-16 flex items-center px-3 border-b">
        <Link href="/">
          <ChevronLeftIcon className="w-6 h-6" />
          <span className="sr-only">Back</span>
        </Link>
      </header>

      <div className="flex flex-col grow p-4">
        <div className="flex flex-col grow">
          <form action={onSubmit} className="flex flex-col gap-4 grow">
            <AlertFromButtons defaultValue={task?.alertFrom ?? undefined} />

            <InputCalendar
              name="dueDate"
              disabled={disabledDays}
              showOutsideDays={true}
              defaultValue={task?.dueDate ?? undefined}
              fixedWeeks
            />

            <Input
              name="description"
              type="textarea"
              placeholder="Description"
              className="text-xl"
              defaultValue={task?.description ?? undefined}
            />

            <Textarea
              name="notes"
              placeholder="Notes"
              className="grow h-[50svh]"
              defaultValue={task?.notes ?? undefined}
            />

            <div className="flex justify-between sticky bottom-4">
              <DeleteTaskButton task={task} onDeleteTask={onDeleteTask} />

              <SubmitButton>
                {task ? "Update Task" : "Create Task"}
              </SubmitButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
