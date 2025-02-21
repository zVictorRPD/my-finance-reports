ALTER TABLE `expense` ADD `hash` text;--> statement-breakpoint
CREATE UNIQUE INDEX `expense_hash_unique` ON `expense` (`hash`);--> statement-breakpoint
ALTER TABLE `revenue` ADD `hash` text;--> statement-breakpoint
CREATE UNIQUE INDEX `revenue_hash_unique` ON `revenue` (`hash`);