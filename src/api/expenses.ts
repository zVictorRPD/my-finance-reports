import { IExpense } from "@/utils/interfaces/expense";
import { db } from "@/database/provider";
import { account, category, expense, subcategory } from "@/database/schema";
import { and, between, eq, inArray, like } from "drizzle-orm";

export interface IGetExpensesFilter {
    description?: string;
    date_start?: Date;
    date_end?: Date;
    categories?: string[];
}

export async function getExpenses(
    filter: IGetExpensesFilter
): Promise<IExpense[]> {
    console.log(filter);
    
    
    const expensesQuery = await db
        .select()
        .from(expense)
        .leftJoin(category, eq(expense.categoryId, category.id))
        .leftJoin(subcategory, eq(expense.subcategoryId, subcategory.id))
        .leftJoin(account, eq(expense.accountId, account.id))
        .where(
            and(
                filter.description ? like(expense.description, `%${filter.description}%`) : undefined,
                (filter.categories && filter.categories.length > 0) ? inArray(category.id, filter.categories.map(n => Number(n))) : undefined,
                (filter.date_start && filter.date_end) ? between(expense.release, filter.date_start.toISOString(), filter.date_end.toISOString()) : undefined
            )
        )
        .orderBy(expense.description)

    const expenses = expensesQuery.map((item) => {
        return {
            description: item.expense.description || "",
            value: item.expense.value || 0,
            charges: item.expense.charges || 0,
            release: item.expense.release || "",
            dueDate: item.expense.dueDate || "",
            effectiveDate: item.expense.effectiveDate || "",
            recurrence: item.expense.recurrence || "",
            installment: item.expense.installment || 0,
            installments: item.expense.installments || 0,
            category: item.category?.name || "",
            subcategory: item.subcategory?.name || "",
            card: item.expense.card || "",
            account: item.account?.name || "",
            notes: item.expense.notes || "",
            hash: item.expense.hash || "",
        };
    });
    return expenses;
}
