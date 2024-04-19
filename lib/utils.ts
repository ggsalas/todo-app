import { type ClassValue, clsx } from "clsx"
import { formatISO } from "date-fns";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getISODate(date: Date) {
  return formatISO(date, { representation: "date" });
}
