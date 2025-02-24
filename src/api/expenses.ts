import { IExpense } from "@/utils/interfaces/expense";
import { db } from "@/database/provider";
import { account, category, expense, subcategory } from "@/database/schema";
import { eq } from "drizzle-orm";

export interface IGetExpensesFilter {
    description?: string;
    date_start?: Date;
    date_end?: Date;
    categories?: string[];
    subcategories?: string[];
}

export async function getExpenses(
    filter: IGetExpensesFilter
): Promise<IExpense[]> {
    const expensesQuery = await db
        .select()
        .from(expense)
        .leftJoin(category, eq(expense.categoryId, category.id))
        .leftJoin(subcategory, eq(expense.subcategoryId, subcategory.id))
        .leftJoin(account, eq(expense.accountId, account.id));

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
