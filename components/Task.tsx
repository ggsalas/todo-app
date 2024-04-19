"use client";

import { CardContent, Card } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Task as TaskType } from "@/lib/definitions";
import { TaskStatusBadge } from "@/components/TaskStatusBadge";
import { useEffect, useRef, useState, useMemo } from "react";
import { differenceInDays, formatDistanceToNowStrict } from "date-fns";
import Link from "next/link";

type TaskProps = {
  task: TaskType;
};

export function Task({ task }: TaskProps) {
  const [viewActions, setViewActions] = useState(false);
  const containerRef = useRef(null);
  const isToday = useMemo(
    () => differenceInDays(new Date(task.dueDate), new Date()) === 0,
    [task.dueDate]
  );
  const isOlderThanToday = useMemo(
    () => differenceInDays(new Date(task.dueDate), new Date()) < 0,
    [task.dueDate]
  );

  useEffect(() => {
    function handleMouseDownOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        viewActions && setViewActions(false);
      }
    }

    document.addEventListener("mousedown", handleMouseDownOutside);
    return () => {
      document.removeEventListener("mousedown", handleMouseDownOutside);
    };
  }, [viewActions]);

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

  return (
    <Card
      onClick={() => setViewActions(true)}
      className="relative cursor-pointer"
      ref={containerRef}
    >
      <CardContent className="px-2 py-2">
        {viewActions && (
          <Card
            className="absolute top-0 right-0 bottom-0 left-0 z-10 bg-black text-white border-black"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <CardContent className="px-2 py-2 h-full">
              <div className="flex justify-between gap-3 items-center h-full">
                <div className="flex justify-between gap-3">
                  <Button
                    className="bg-black text-white"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setViewActions(false);
                    }}
                  >
                    X
                  </Button>
                  <Link
                    href={`/app/edit/${task.id}`}
                    className={`${buttonVariants({
                      variant: "outline",
                      size: "sm",
                    })} bg-black text-white`}
                  >
                    Edit
                  </Link>
                </div>

                <div className="flex justify-between gap-3">
                  <Button
                    className="bg-black text-white"
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    In Progress
                  </Button>
                  <Button
                    className="bg-black text-white"
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    Done!
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

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
                    isToday
                      ? "endsToday"
                      : isOlderThanToday
                      ? "olderThanToday"
                      : task.status
                  }
                >
                  {task.status.toUpperCase()}
                </TaskStatusBadge>
              </div>
            )}
          </div>
        </div>

        {task.description && (
          <div className="flex">
            <h2 className="text-sm leading-5 font-medium">
              {task.description}
            </h2>
          </div>
        )}

        {task.notes && (
          <p className="text-sm leading-5 text-gray-500 dark:text-gray-400">
            {task.notes}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
