import { CardContent, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Task as TaskType } from "@/lib/definitions";

type TaskProps = {
  task: TaskType;
};

export async function Task({ task }: TaskProps) {
  const onChangeStatus = async () => {
    "use server";
    console.log(task);
  };

  return (
    <Card>
      <CardContent className="p-0">
        <form
          action={onChangeStatus}
          className="flex flex-row justify-between items-stretch gap-4 py-4 px-4"
        >
          <div className="flex flex-col justify-between gap-3">
            {task.description && (
              <h2 className="text-sm leading-5 font-medium">
                {task.description}
              </h2>
            )}
            {task.notes && (
              <p className="text-sm leading-5 text-gray-500 dark:text-gray-400">
                {task.notes}
              </p>
            )}
          </div>

          <div className="flex flex-col justify-between gap-3">
            {task.dueDate && (
              <div className="text-xs leading-5 whitespace-nowrap">
                {'Due '}
                <time dateTime="2023-11-21">{new Date(task.dueDate).toUTCString()}</time>
              </div>
            )}

            {task.status && (
              <div className="flex justify-end">
                <Button
                  size="sm"
                  variant="outline"
                  className="whitespace-nowrap"
                  type="submit"
                >
                  {task.status}
                </Button>
              </div>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
