CREATE TABLE `account` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `account_name_unique` ON `account` (`name`);--> statement-breakpoint
CREATE TABLE `category` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `category_name_unique` ON `category` (`name`);--> statement-breakpoint
CREATE TABLE `expense` (
	`id` integer PRIMARY KEY NOT NULL,
	`description` text,
	`value` integer,
	`charges` integer,
	`release` text,
	`dueDate` text,
	`effectiveDate` text,
	`recurrence` text,
	`installment` integer,
	`installments` integer,
	`category_id` integer,
	`subcategory_id` integer,
	`card` text,
	`account_id` integer,
	`notes` text,
	FOREIGN KEY (`category_id`) REFERENCES `category`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`subcategory_id`) REFERENCES `subcategory`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`account_id`) REFERENCES `account`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `revenue` (
	`id` integer PRIMARY KEY NOT NULL,
	`description` text,
	`value` integer,
	`release` text,
	`dueDate` text,
	`effectiveDate` text,
	`recurrence` text,
	`installment` integer,
	`installments` integer,
	`category_id` integer,
	`subcategory_id` integer,
	`account_id` integer,
	`notes` text,
	FOREIGN KEY (`category_id`) REFERENCES `category`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`subcategory_id`) REFERENCES `subcategory`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`account_id`) REFERENCES `account`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `subcategory` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`category_id` integer,
	FOREIGN KEY (`category_id`) REFERENCES `category`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `subcategory_name_unique` ON `subcategory` (`name`);