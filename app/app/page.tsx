import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Task } from "@/components/Task";
import { UserAvatar } from "@/components/UserAvatar";
import { getTasks } from "../db";

export default async function AppPage() {

  const tasks = await getTasks()

  console.log(tasks)
  return (
    <div className="flex flex-col w-full h-full relative">
      {/* Floating button */}
      <Button
        className="ml-auto fixed bottom-12 right-8 w-16 h-16 rounded-[4rem] shadow-xl"
        size="sm"
      >
        <PlusIcon className="w-6 h-6" />
      </Button>

      {/* Header */}
      <header className="h-16 flex items-center px-3 border-b">
        <div className="w-full h-12 rounded-[3rem] bg-gray-100 dark:bg-gray-800 flex items-center relative">
          <SearchIcon className="z-10 w-6 h-6 opacity-50 absolute left-4" />
          <Input
            autoCapitalize="off"
            autoCorrect="off"
            className="h-12 w-full rounded-[3rem] bg-transparent border-none pl-12 pr-14"
            placeholder="Search"
            spellCheck="false"
            type="search"
          />
          <UserAvatar />
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <div className="grid gap-2 p-3">
          {tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
