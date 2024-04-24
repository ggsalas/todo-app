import { Task as TaskType } from "@/lib/definitions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "@/components/SubmitButton";
import { InputCalendar } from "@/components/ui/InputCalendar/InputCalendar";
import { subDays } from "date-fns/subDays";
import { AlertFromButtons } from "./AlertFromButtons";
import { DeleteTaskButton } from "./DeleteTaskButton";
import { BackButton } from "./BackButton";

type TaskFormProps = {
  task?: TaskType;
  onSubmit: (formData: FormData) => void;
  onDeleteTask?: (formData: FormData) => void;
  redirectRoute: string;
};

export function TaskForm({
  task,
  onSubmit,
  onDeleteTask,
  redirectRoute,
}: TaskFormProps) {
  const disabledDays = [
    { from: new Date("2000-01-01"), to: subDays(new Date(), 1) },
  ];

  return (
    <div className="flex flex-col w-full min-h-svh relative">
      <header className="h-14 flex items-center px-3 border-b gap-3">
        <BackButton />
        {task ? (
          <h1 className="text-1xl font-extrabold">Edit Task</h1>
        ) : (
          <h1 className="text-1xl font-extrabold">Create new Task</h1>
        )}
      </header>

      <div className="flex flex-col grow p-4">
        <div className="flex flex-col grow">
          <form action={onSubmit} className="flex flex-col gap-4 grow">
            <input hidden name="redirectRoute" defaultValue={redirectRoute} />

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
              <DeleteTaskButton
                task={task}
                onDeleteTask={onDeleteTask}
                redirectRoute={redirectRoute}
              />

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
