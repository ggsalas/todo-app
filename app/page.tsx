import Link from "next/link";

export default function Page() {
  return (
    <div className="flex h-screen bg-black">
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <p className="text-white">Hola</p>

        <Link
          href="/app"
          className="text-stone-400 underline hover:text-stone-200 transition-all"
        >
          Open App
        </Link>
      </div>
    </div>
  );
}
