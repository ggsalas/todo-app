"use client";

import { Button } from "@/components/ui/button";
import { Task } from "@/lib/definitions";
import { useState } from "react";

type AlertFromButtonsProps = {
  defaultValue?: Task['alertFrom'];
}

export function AlertFromButtons({ defaultValue = 'day' }: AlertFromButtonsProps) {
  const [alertFrom, setAlertFrom] = useState(defaultValue);

  return (
    <div className="flex justify-between items-center">
      <input hidden name="alertFrom" value={alertFrom} onChange={() => null} />
      <span>Alert me on the same: </span>

      <div>
        <Button
          variant={`${alertFrom === 'week' ? 'default' : 'outline'}`}
          type="button"
          className="rounded-r-none"
          onClick={() => setAlertFrom("week")}
        >
          Week
        </Button>
        <Button
          variant={`${alertFrom === 'day' ? 'default' : 'outline'}`}
          type="button"
          className="rounded-l-none"
          onClick={() => setAlertFrom("day")}
        >
          Day
        </Button>
      </div>
    </div>
  );
}
