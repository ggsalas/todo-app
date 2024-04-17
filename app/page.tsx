import Link from "next/link";

export default function Page() {
  return (
    <div className="h-screen w-full flex flex-col justify-center p-6 bg-gray-50">
      <div className="container flex flex-col items-center justify-center gap-5 px-4 text-center">

        <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
          <div className="flex flex-col items-center justify-center space-y-3 gap-5 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                <span>TODO: App!</span>
              </h1>
            </div>
            <p className="text-gray-500 md:text-xl/relaxed xl:text-base/relaxed dark:text-gray-400">
              Your one-stop solution for managing tasks with ease. Log in to
              supercharge your productivity!
            </p>

            <Link
              className="inline-flex h-10 items-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
              href="/login"
            >
              Log in
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
