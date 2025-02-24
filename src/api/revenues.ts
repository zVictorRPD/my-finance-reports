import { IRevenue } from "@/utils/interfaces/revenue";
import { db } from "@/database/provider";
import { account, category, revenue, subcategory } from "@/database/schema";
import { eq } from "drizzle-orm";

export interface IGetRevenuesFilter {
    description?: string;
    value?: number;
    release?: string;
    category?: string;
    subcategory?: string;
}

export async function getRevenues(filter: IGetRevenuesFilter): Promise<IRevenue[]> {
    const revenuesQuery = await db
        .select()
        .from(revenue)
        .leftJoin(category, eq(revenue.categoryId, category.id))
        .leftJoin(subcategory, eq(revenue.subcategoryId, subcategory.id))
        .leftJoin(account, eq(revenue.accountId, account.id))

    const revenues = revenuesQuery.map((item) => {
        
        return {
            description: item.revenue.description || "",
            value: item.revenue.value || 0,
            release: item.revenue.release || "",
            dueDate: item.revenue.dueDate || "",
            effectiveDate: item.revenue.effectiveDate || "",
            recurrence: item.revenue.recurrence || "",
            installment: item.revenue.installment || 0,
            installments: item.revenue.installments || 0,
            category: item.category?.name || "",
            subcategory: item.subcategory?.name || "",
            account: item.account?.name || "",
            notes: item.revenue.notes || "",
            hash: item.revenue.hash || "",
        }
    });
    
    return revenues
}