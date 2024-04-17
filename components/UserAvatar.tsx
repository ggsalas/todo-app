import Link from "next/link";

export function UserAvatar() {
  return (
    <Link
      className="z-10 ml-auto absolute right-4 w-8 h-8 rounded-[2rem]  flex items-center justify-center"
      href="/app/settings"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        className="w-6 h-6 overflow-hidden opacity-50"
      >
        <title>user avatar</title>
        <path
          d="M10 12.5c-5.92 0-9 3.5-9 5.5v1h18v-1c0-2-3.08-5.5-9-5.5z"
          fill="#000000"
        />
        <circle cx="10" cy="6" r="5" fill="#000000" />
      </svg>
    </Link>
  );
}
