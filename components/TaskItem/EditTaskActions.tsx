"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItemNoCheck,
  SelectTrigger,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { onChangeTaskStatus } from "./onChangeTaskStatus";
import { Task } from "@/lib/definitions";

type EditTaskActions = {
  taskId: number;
};

export function EditTaskActions({ taskId }: EditTaskActions) {
  const router = useRouter();

  const onSelectChange = (value: Task["status"] & 'edit') => {
    if (value === "edit") {
      return router.push(`/app/edit/${taskId}`);
    } else {
      const formData = new FormData();
      formData.append("status", value);
      formData.append("id", String(taskId));

      onChangeTaskStatus(formData);
    }
  };

  const onSetDone = () => {
    const formData = new FormData();
    formData.append("status", "done");
    formData.append("id", String(taskId));

    onChangeTaskStatus(formData);
  };

  return (
    <div className="flex text-black">
      <Button
        variant="outline"
        className="rounded-r-none text-black"
        onClick={onSetDone}
      >
        Done!
      </Button>

      <Select onValueChange={onSelectChange}>
        <SelectTrigger className="rounded-l-none w-10 focus:ring-0 focus:ring-offset-0" />
        <SelectContent>
          <SelectItemNoCheck value="todo">
            Set <strong>TODO</strong> status
          </SelectItemNoCheck>
          <SelectItemNoCheck value="inProgress">
            Set <strong>In Progress</strong> status
          </SelectItemNoCheck>
          <SelectItemNoCheck value="edit">Edit Task</SelectItemNoCheck>
        </SelectContent>
      </Select>
    </div>
  );
}
