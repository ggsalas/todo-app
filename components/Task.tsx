"use client";

import { CardContent, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Task as TaskType } from "@/lib/definitions";
import { formatDistance } from "date-fns/formatDistance";
import { useEffect, useRef, useState } from "react";

type TaskProps = {
  task: TaskType;
};

export function Task({ task }: TaskProps) {
  const [viewActions, setViewActions] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleMouseDownOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        viewActions && setViewActions(false)
      }
    }

    document.addEventListener('mousedown', handleMouseDownOutside);
    return () => {
      document.removeEventListener('mousedown', handleMouseDownOutside);
    };
  }, [viewActions])


  const header = (
    <div ref={containerRef} className="flex flex-col gap-3">
      <div className="flex justify-end gap-3">
        {task.dueDate && (
          <div className="text-xs leading-5 whitespace-nowrap">
            <time dateTime="2023-11-21">
              {formatDistance(new Date(task.dueDate), new Date(), {
                addSuffix: true,
              })}
            </time>
          </div>
        )}

        {task.status && (
          <div className="flex justify-end">
            <Badge className="whitespace-nowrap">{task.status}</Badge>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Card
      onClick={() => setViewActions(true)}
      className="relative cursor-pointer"
    >
      <CardContent className="px-2 py-2">
        {viewActions && (
          <Card className="absolute top-0 right-0 bottom-0 left-0 z-10 bg-black text-white border-black">
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
                  <Button
                    className="bg-black text-white"
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    Edit
                  </Button>
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

        {header}

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
