ALTER TABLE "Task" ALTER COLUMN "status" SET DEFAULT 'todo';--> statement-breakpoint
ALTER TABLE "Task" ADD COLUMN "alertFrom" text NOT NULL;