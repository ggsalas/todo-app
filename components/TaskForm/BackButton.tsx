"use client";

import Link from "next/link";
import { ChevronLeftIcon } from "@/components/ui/icons/ChevronLeftIcon";
import { useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();

  return (
    <Link href="#" onClick={router.back}>
      <ChevronLeftIcon className="w-6 h-6" />
      <span className="sr-only">Back</span>
    </Link>
  );
}
