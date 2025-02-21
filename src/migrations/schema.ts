import { sqliteTable, AnySQLiteColumn, uniqueIndex, integer, text, foreignKey } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const account = sqliteTable("account", {
	id: integer().primaryKey().notNull(),
	name: text(),
},
(table) => [
	uniqueIndex("account_name_unique").on(table.name),
]);

export const category = sqliteTable("category", {
	id: integer().primaryKey().notNull(),
	name: text(),
	type: text(),
},
(table) => [
	uniqueIndex("category_name_unique").on(table.name),
]);

export const expense = sqliteTable("expense", {
	id: integer().primaryKey().notNull(),
	description: text(),
	value: integer(),
	charges: integer(),
	release: text(),
	dueDate: text(),
	effectiveDate: text(),
	recurrence: text(),
	installment: integer(),
	installments: integer(),
	categoryId: integer("category_id").references(() => category.id),
	subcategoryId: integer("subcategory_id").references(() => subcategory.id),
	card: text(),
	accountId: integer("account_id").references(() => account.id),
	notes: text(),
});

export const revenue = sqliteTable("revenue", {
	id: integer().primaryKey().notNull(),
	description: text(),
	value: integer(),
	release: text(),
	dueDate: text(),
	effectiveDate: text(),
	recurrence: text(),
	installment: integer(),
	installments: integer(),
	categoryId: integer("category_id").references(() => category.id),
	subcategoryId: integer("subcategory_id").references(() => subcategory.id),
	accountId: integer("account_id").references(() => account.id),
	notes: text(),
});

export const subcategory = sqliteTable("subcategory", {
	id: integer().primaryKey().notNull(),
	name: text(),
	categoryId: integer("category_id").references(() => category.id),
});

export const drizzleMigrations = sqliteTable("__drizzle_migrations", {
});

