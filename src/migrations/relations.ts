import { relations } from "drizzle-orm/relations";
import { account, expense, subcategory, category, revenue } from "./schema";

export const expenseRelations = relations(expense, ({one}) => ({
	account: one(account, {
		fields: [expense.accountId],
		references: [account.id]
	}),
	subcategory: one(subcategory, {
		fields: [expense.subcategoryId],
		references: [subcategory.id]
	}),
	category: one(category, {
		fields: [expense.categoryId],
		references: [category.id]
	}),
}));

export const accountRelations = relations(account, ({many}) => ({
	expenses: many(expense),
	revenues: many(revenue),
}));

export const subcategoryRelations = relations(subcategory, ({one, many}) => ({
	expenses: many(expense),
	revenues: many(revenue),
	category: one(category, {
		fields: [subcategory.categoryId],
		references: [category.id]
	}),
}));

export const categoryRelations = relations(category, ({many}) => ({
	expenses: many(expense),
	revenues: many(revenue),
	subcategories: many(subcategory),
}));

export const revenueRelations = relations(revenue, ({one}) => ({
	account: one(account, {
		fields: [revenue.accountId],
		references: [account.id]
	}),
	subcategory: one(subcategory, {
		fields: [revenue.subcategoryId],
		references: [subcategory.id]
	}),
	category: one(category, {
		fields: [revenue.categoryId],
		references: [category.id]
	}),
}));