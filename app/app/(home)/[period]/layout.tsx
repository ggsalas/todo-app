import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserAvatar } from "@/components/UserAvatar";
import Link from "next/link";

type HomePageLayoutProps = {
  params: { period: string };
  children: React.ReactNode;
}

export default async function HomePageLayout({ params, children }: HomePageLayoutProps) {
  const navigation = [
    { period: "day", label: "Day" },
    { period: "week", label: "Week" },
    { period: "year", label: "Year" },
  ];

  const period = params.period;
  console.log(params, period)
  return (
    <div className="flex flex-col w-full h-full min-h-svh relative">
      {/* Floating button */}
      <Link
        className={`${buttonVariants({
          size: "sm",
        })} fixed bottom-16 right-4 w-14 !h-14 !rounded-[8rem] shadow-xl z-20`}
        href="/app/add-task"
      >
        <PlusIcon className="w-6 h-6" />
      </Link>

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
      <div className="flex-1 overflow-auto select-none">
        <div className="grid gap-2 p-3 mb-28">{children}</div>
      </div>

      {/* Navigation */}
      <div className="flex justify-stretch w-full border-t">
        {navigation.map(({ period, label }) => (
          <Link
            key={period}
            className={`
              ${buttonVariants({ variant: "ghost" })}
              ${params.period == period ? "font-black" : ""} 
              flex-grow !rounded-none`}
            href={`/app/${period}`}
          >
            {label}
          </Link>
        ))}
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
