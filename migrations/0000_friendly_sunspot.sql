CREATE TABLE if not exists `answers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`question_id` integer NOT NULL,
	`is_correct` integer DEFAULT false,
	FOREIGN KEY (`question_id`) REFERENCES `questions`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE if not exists `questions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`quiz_id` integer
);
--> statement-breakpoint
CREATE TABLE if not exists `quizzes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`description` text,
	`user_id` integer
);
--> statement-breakpoint
CREATE TABLE if not exists `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`username` text NOT NULL,
	`password` text NOT NULL,
	`date_creation` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX if not exists `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX if not exists `users_username_unique` ON `users` (`username`);
