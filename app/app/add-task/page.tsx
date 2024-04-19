import Link from "next/link";
import { ChevronLeftIcon } from "@/components/ui/icons/ChevronLeftIcon";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createTask } from "@/app/db";
import { redirect } from "next/navigation";
import { InputCalendar } from "@/components/ui/InputCalendar/InputCalendar";
import { subDays } from "date-fns/subDays";

export default async function AddTask() {
  async function createTicket(formData: FormData) {
    "use server";
    const { description, dueDate, alertFrom, calendar } =
      Object.fromEntries(formData);

    await createTask({
      description: String(description),
      dueDate: String(dueDate),
      alertFrom: String(alertFrom) as any,
    });

    redirect("/app");
  }

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
          <form action={createTicket} className="flex flex-col gap-4 grow">
            <select name="alertFrom">
              <option value="day" defaultChecked>
                Day
              </option>
              <option value="week">Week</option>
            </select>

            <InputCalendar
              name="dueDate"
              disabled={disabledDays}
              showOutsideDays={true}
              fixedWeeks
            />

            <Input
              name="description"
              type="textarea"
              placeholder="Description"
              className="text-xl"
            />

            <Textarea name="notes" placeholder="Notes" className="grow h-[50svh]" />

            <div className="flex justify-end sticky bottom-4">
              <Button type="submit">Create Task</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
