import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      status: {
        todo: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        inProgress:
          "border-transparent bg-sky-600 text-primary-foreground hover:bg-sky-600/80",
        done: "border-transparent bg-green-600 text-primary-foreground hover:bg-green-600/80",
        endsToday:
          "border-transparent bg-purple-600 text-primary-foreground hover:bg-purple-600/80",
        olderThanToday:
          "border-transparent bg-red-600 text-primary-foreground hover:bg-red-600/80",
      },
    },
    defaultVariants: {
      status: "todo",
    },
  }
);

export interface TaskStatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { }

function TaskStatusBadge({ className, status, ...props }: TaskStatusBadgeProps) {
  return (
    <div className={cn(badgeVariants({ status }), className)} {...props} />
  );
}

export { TaskStatusBadge, badgeVariants };
