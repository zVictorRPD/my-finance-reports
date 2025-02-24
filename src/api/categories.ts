import { db } from "@/database/provider";
import { category, subcategory } from "@/database/schema";
import { ICategory, ISubcategory } from "@/utils/interfaces/category";

export async function getCategories(): Promise<ICategory[]> {
    const categoriesQuery = await db
        .select()
        .from(category)

    return categoriesQuery;
}

export async function getSubcategories(): Promise<ISubcategory[]> {
    const subcategoriesQuery = await db
        .select()
        .from(subcategory)

    return subcategoriesQuery;
}