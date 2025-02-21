CREATE TABLE `user` (
	`id` integer PRIMARY KEY NOT NULL,
	`email` text,
	`password` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
ALTER TABLE `account` ADD `user_id` integer REFERENCES user(id);--> statement-breakpoint
ALTER TABLE `category` ADD `user_id` integer REFERENCES user(id);--> statement-breakpoint
ALTER TABLE `expense` ADD `user_id` integer REFERENCES user(id);--> statement-breakpoint
ALTER TABLE `revenue` ADD `user_id` integer REFERENCES user(id);