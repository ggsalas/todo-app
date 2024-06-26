"use client";

import { CardContent, Card } from "@/components/ui/card";
import { Task as TaskType } from "@/lib/definitions";
import { TaskStatusBadge } from "@/components/TaskItem/TaskStatusBadge";
import { useMemo } from "react";
import { differenceInDays, formatDistanceToNowStrict } from "date-fns";
import Markdown from "react-markdown";
import "./styles.css";
import { useSearchParams } from "next/navigation";
import { EditTaskActions } from "./EditTaskActions";

type TaskProps = {
  task: TaskType;
};

export function Task({ task }: TaskProps) {
  const searchParams = useSearchParams();
  const displayActionsTaskId = Number(searchParams.get("displayActionsTaskId"));
  const isToday = useMemo(
    () => differenceInDays(new Date(task.dueDate), new Date()) === 0,
    [task.dueDate]
  );
  const isOlderThanToday = useMemo(
    () => differenceInDays(new Date(task.dueDate), new Date()) < 0,
    [task.dueDate]
  );

  const formatDueDate = () => {
    if (isToday) {
      return "Today";
    } else {
      return formatDistanceToNowStrict(new Date(task.dueDate), {
        addSuffix: true,
        unit: "day",
        roundingMethod: "floor",
      });
    }
  };

  const onDisplayActionsTaskId = () => {
    // Use window.history.replaceState to avoid a request to the server
    // This is only to handle the UI state
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}?displayActionsTaskId=${task.id}`
    );
  };

  const onToggleActionsTaskId = () => {
    if (!!displayActionsTaskId) {
      window.history.replaceState({}, "", `${window.location.pathname}`);
    } else {
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}?displayActionsTaskId=${task.id}`
      );
    }
  };

  const statusLabels = {
    todo: 'todo',
    inProgress: 'In Progress',
    done: 'Done'
  }

  return (
    <Card
      className="relative cursor-pointer select-none"
      onClick={onDisplayActionsTaskId}
    >
      <CardContent className="px-2 py-2">
        {/* Actions */}
        {displayActionsTaskId === task.id && (
          <Card
            className="absolute top-0 left-0 right-0 min-h-full z-10 text-white border-black border-none backdrop-blur-sm bg-white/60 flex flex-col"
            onClick={(e) => {
              e.stopPropagation();
              onToggleActionsTaskId();
            }}
          >
            <CardContent className="px-2 py-2 h-full flex flex-col">
              <div className="flex justify-end">
                <EditTaskActions taskId={task.id} />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Info */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-end gap-3">
            {task.dueDate && (
              <div className="text-xs leading-5 whitespace-nowrap">
                <time dateTime="2023-11-21">{formatDueDate()}</time>
              </div>
            )}

            {task.status && (
              <div className="flex justify-end">
                <TaskStatusBadge
                  className="whitespace-nowrap"
                  status={
                    isToday && task.status === "todo"
                      ? "endsToday"
                      : isOlderThanToday && task.status !== 'done'
                        ? "olderThanToday"
                        : task.status
                  }
                >
                  {statusLabels[task.status].toUpperCase()}
                </TaskStatusBadge>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-1 mt-1">
          {task.description && (
            <div className="flex">
              <h2 className="text-sm leading-5 font-medium">
                {task.description}
              </h2>
            </div>
          )}

          {task.notes && (
            <Markdown className="notes text-sm leading-5 text-gray-500 dark:text-gray-400">
              {task.notes}
            </Markdown>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
