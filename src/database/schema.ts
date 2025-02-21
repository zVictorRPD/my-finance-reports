import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core";

export const user = sqliteTable("user", {
    id: integer("id").primaryKey(),
    email: text().unique(),
    password: text(),
    revenueLastImport: text(),
    expenseLastImport: text(),
});

export const account = sqliteTable("account", {
    id: integer("id").primaryKey(),
    name: text().unique(),
    userId: integer("user_id").references(() => user.id)
});

export const category = sqliteTable("category", {
    id: integer("id").primaryKey(),
    name: text().unique(),
    type: text(),
    userId: integer("user_id").references(() => user.id)
});

export const subcategory = sqliteTable("subcategory", {
    id: integer("id").primaryKey(),
    name: text(),
    categoryId: integer("category_id").references(() => category.id)
});

export const revenue = sqliteTable("revenue", {
    id: integer("id").primaryKey(),
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
    userId: integer("user_id").references(() => user.id),
    hash: text().unique()
});

export const expense = sqliteTable("expense", {
    id: integer("id").primaryKey(),
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
    userId: integer("user_id").references(() => user.id),
    hash: text().unique()
});