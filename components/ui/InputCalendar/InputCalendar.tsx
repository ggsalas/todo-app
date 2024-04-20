"use client";

import { Calendar, CalendarProps } from "@/components/ui/calendar";
import { useState } from "react";
import "./styles.css";
import { getISODate } from "@/lib/utils";

type InputCalendarProps = Exclude<
  CalendarProps,
  "onSelect" | "selected" | "mode" | "className"
> & {
  name: string;
  defaultValue?: string;
};

export function InputCalendar({
  name,
  defaultValue,
  ...rest
}: InputCalendarProps) {
  const [date, setDate] = useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : new Date()
  );

  return (
    <>
      <input
        hidden
        name={name}
        value={getISODate(date!)}
        onChange={() => null}
      />
      <Calendar
        {...rest}
        mode="single"
        selected={date}
        onSelect={setDate}
        className="input-calendar rounded-md border w-full"
      />
    </>
  );
}
