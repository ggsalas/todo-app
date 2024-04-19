"use client";

import { Calendar, CalendarProps } from "@/components/ui/calendar";
import { useState } from "react";
import './styles.css';

type InputCalendarProps = Exclude<
  CalendarProps,
  "onSelect" | "selected" | "mode" | "className"
> & {
  name: string;
};

export function InputCalendar({ name, ...rest }: InputCalendarProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <>
      <input hidden name={name} value={date?.toUTCString()} onChange={() => null} />
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
