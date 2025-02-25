import { db } from "@/database/provider";
import { category, subcategory } from "@/database/schema";
import { ICategory, ISubcategory } from "@/utils/interfaces/category";
import { eq } from "drizzle-orm";

export async function getCategories(type: "revenue" | "expense"): Promise<ICategory[]> {
    const categoriesQuery = await db
        .select()
        .from(category)
        .where(eq(category.type, type))

    return categoriesQuery;
}

export async function getSubcategories(): Promise<ISubcategory[]> {
    const subcategoriesQuery = await db
        .select()
        .from(subcategory)

    return subcategoriesQuery;
}