import { Task as TaskType } from "@/lib/definitions";
import { Button } from "@/components/ui/button";
import { onChangeTaskStatus } from "./onChangeTaskStatus";

type EditTaskStatusFormProps = {
  status: TaskType["status"];
  label: string;
  id: number;
};

export function EditTaskStatusForm({ status, label, id }: EditTaskStatusFormProps) {
  const getSatusVariants = () => {
    switch (status) {
      case "done": 
        return "bg-green-600 border border-green-600"
      case "inProgress": 
        return "bg-sky-600 border border-sky-600"
      default:
        return "bg-black text-white"
    }
  }

  return (
    <form action={onChangeTaskStatus}>
      <input hidden name="status" value={status} onChange={() => null} />
      <input hidden name="id" value={id} onChange={() => null} />
      <Button
        className={getSatusVariants()}
        variant="outline"
        size="sm"
        type="submit"
      >{label}</Button>
    </form>
  );
}
