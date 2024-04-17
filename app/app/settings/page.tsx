import { auth, signOut } from "app/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Settings() {
  let session = await auth();

  return (
    <div className="flex flex-col w-full h-full relative">
      <header className="h-16 flex items-center px-3 border-b">
        <Link href="/" className="">
          <ChevronLeftIcon className="w-6 h-6" />
          <span className="sr-only">Back</span>
        </Link>
      </header>

      <div className="flex-1 overflow-auto items-center justify-center p-4">
        <div className="w-full flex flex-col gap-4 items-center text-center">
          You are logged in as {session?.user?.email}
          <SignOut />
        </div>
      </div>
    </div>
  );
}

function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button type="submit" variant="secondary">
        Sign out
      </Button>
    </form>
  );
}

function ChevronLeftIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}
