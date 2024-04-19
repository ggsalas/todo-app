CREATE TABLE IF NOT EXISTS "Task" (
	"id" serial PRIMARY KEY NOT NULL,
	"authorEmail" varchar(64) NOT NULL,
	"description" varchar NOT NULL,
	"notes" varchar,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"dueDate" date NOT NULL,
	"status" text DEFAULT 'todo' NOT NULL,
	"alertFrom" text DEFAULT 'day' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "User" (
	"id" serial NOT NULL,
	"email" varchar(64) PRIMARY KEY NOT NULL,
	"password" varchar(64) NOT NULL,
	"timezoneOffset" smallint,
	CONSTRAINT "User_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Task" ADD CONSTRAINT "Task_authorEmail_User_email_fk" FOREIGN KEY ("authorEmail") REFERENCES "User"("email") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
