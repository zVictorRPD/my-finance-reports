import CryptoJS from "crypto-js";
import { db } from "@/database/provider";
import {
    account,
    category,
    expense,
    revenue,
    subcategory,
    user,
} from "@/database/schema";
import {
    maskDateWithHours,
    maskDateWithoutHours,
} from "@/utils/functions/masks";
import { IExpense } from "@/utils/interfaces/expense";
import { IRevenue } from "@/utils/interfaces/revenue";
import { eq } from "drizzle-orm";

export async function ImportData(
    content: string,
    type: "revenue" | "expense",
    userId: number
) {
    const lines = content.split("\r\n");
    const data = lines.map((line) => {
        if (line.charAt(0) == '"') {
            const newLine = line.replaceAll('"",', "&#34;");
            return newLine.slice(1, newLine.length - 1).split(",");
        }
        return line.split(",");
    });

    let counter = {
        accounts: 0,
        categories: 0,
        subcategories: 0,
        revenues: 0,
        expenses: 0,
    };
    const formattedData = data.slice(1);
    const revenues = [] as IRevenue[];
    const expenses = [] as IExpense[];
    const accounts = [] as string[];
    const categories = [] as string[];
    const subcategories = [] as {
        category: string;
        subcategory: string;
    }[];

    if (type === "revenue") {
        formattedData.forEach((revenue) => {
            const [
                description,
                value,
                release,
                dueDate,
                effectiveDate,
                recurrence,
                installment,
                installments,
                category,
                subcategory,
                account,
                notes,
            ] = revenue;

            if (
                description === undefined ||
                value === undefined ||
                release === undefined ||
                dueDate === undefined ||
                effectiveDate === undefined ||
                recurrence === undefined ||
                installment === undefined ||
                installments === undefined ||
                category === undefined ||
                subcategory === undefined ||
                account === undefined ||
                notes === undefined
            ) {
                return;
            }
            if (!accounts.includes(account)) {
                accounts.push(account);
            }
            if (!categories.includes(category)) {
                categories.push(category);
            }
            if (
                !subcategories.some(
                    (sub) =>
                        sub.category === category &&
                        sub.subcategory === subcategory
                )
            ) {
                subcategories.push({
                    category,
                    subcategory,
                });
            }

            const hash = CryptoJS.MD5(JSON.stringify(revenue)).toString();

            revenues.push({
                description,
                value: parseInt(value) * 100,
                release: maskDateWithoutHours(release),
                dueDate: maskDateWithoutHours(dueDate),
                effectiveDate: maskDateWithoutHours(effectiveDate),
                recurrence,
                installment: parseInt(installment),
                installments: parseInt(installments),
                category,
                subcategory,
                account,
                notes,
                hash,
            });
        });
    }

    if (type === "expense") {
        formattedData.forEach((expense) => {
            const [
                description,
                value,
                charges,
                release,
                dueDate,
                effectiveDate,
                recurrence,
                installment,
                installments,
                category,
                subcategory,
                card,
                account,
                notes,
            ] = expense;

            if (
                description === undefined ||
                value === undefined ||
                charges === undefined ||
                release === undefined ||
                dueDate === undefined ||
                effectiveDate === undefined ||
                recurrence === undefined ||
                installment === undefined ||
                installments === undefined ||
                category === undefined ||
                subcategory === undefined ||
                card === undefined ||
                account === undefined ||
                notes === undefined
            ) {
                return;
            }

            if (!accounts.includes(account)) {
                accounts.push(account);
            }
            if (!categories.includes(category)) {
                categories.push(category);
            }
            if (
                !subcategories.some(
                    (sub) =>
                        sub.category === category &&
                        sub.subcategory === subcategory
                )
            ) {
                subcategories.push({
                    category,
                    subcategory,
                });
            }

            const hash = CryptoJS.MD5(JSON.stringify(expense)).toString();

            expenses.push({
                description,
                value: parseInt(value) * 100,
                charges: parseInt(charges),
                release: maskDateWithHours(release),
                dueDate: maskDateWithoutHours(dueDate),
                effectiveDate: maskDateWithoutHours(effectiveDate),
                recurrence,
                installment: parseInt(installment),
                installments: parseInt(installments),
                category,
                subcategory,
                card,
                account,
                notes,
                hash,
            });
        });
    }

    await db.transaction(async (tx) => {
        const accountsInserteds = await tx
            .insert(account)
            .values(accounts.map((account) => ({ name: account, userId })))
            .onConflictDoNothing()
            .returning();

        counter.accounts = accountsInserteds.length;

        const savedAccounts = await tx
            .select({
                id: account.id,
                name: account.name,
            })
            .from(account);

        const categoriesInserteds = await tx
            .insert(category)
            .values(
                categories.map((category) => ({
                    name: category,
                    type: type,
                    userId,
                }))
            )
            .onConflictDoNothing()
            .returning();

        counter.categories = categoriesInserteds.length;

        const savedCategories = await tx
            .select({
                id: category.id,
                name: category.name,
            })
            .from(category);

        const savedSubcategories = await tx
            .select({
                id: subcategory.id,
                name: subcategory.name,
                categoryId: subcategory.categoryId,
            })
            .from(subcategory);

        const subcategoriesToInsert = subcategories
            .map((subcategory) => {
                let skip = false;
                const categoryId = savedCategories.find(
                    (category) => category.name === subcategory.category
                )?.id;

                savedSubcategories.forEach((sub) => {
                    if (
                        categoryId === sub.categoryId &&
                        subcategory.subcategory === sub.name
                    ) {
                        skip = true;
                    }
                });

                if (skip) {
                    return false;
                }

                return {
                    name: subcategory.subcategory,
                    categoryId: categoryId,
                };
            })
            .filter((value) => value !== false);

        if (subcategoriesToInsert.length !== 0) {
            const subcategoriesInserteds = await tx
                .insert(subcategory)
                .values(subcategoriesToInsert)
                .returning();

            counter.subcategories = subcategoriesInserteds.length;
        }

        if (type === "revenue") {
            const completedRevenues = revenues.map((revenue) => ({
                ...revenue,
                categoryId: savedCategories.find(
                    (category) => category.name === revenue.category
                )?.id,
                subcategoryId: savedSubcategories.find(
                    (subcategory) => subcategory.name === revenue.subcategory
                )?.id,
                accountId: savedAccounts.find(
                    (account) => account.name === revenue.account
                )?.id,
                userId,
            }));

            const revenuesInserteds = await tx
                .insert(revenue)
                .values(completedRevenues)
                .onConflictDoNothing()
                .returning();

            counter.revenues = revenuesInserteds.length;
        }

        if (type === "expense") {
            const completedExpenses = expenses.map((expense) => ({
                ...expense,
                categoryId: savedCategories.find(
                    (category) => category.name === expense.category
                )?.id,
                subcategoryId: savedSubcategories.find(
                    (subcategory) => subcategory.name === expense.subcategory
                )?.id,
                accountId: savedAccounts.find(
                    (account) => account.name === expense.account
                )?.id,
                userId,
            }));

            const expensesInserteds = await tx
                .insert(expense)
                .values(completedExpenses)
                .onConflictDoNothing()
                .returning();
            counter.expenses = expensesInserteds.length;
        }
    });

    return counter;
}

export async function registerLastImport(type: "revenue" | "expense") {
    const now = new Date().toISOString();
    if (type === "revenue") {
        await db.update(user).set({
            revenueLastImport: now,
        });
    } else {
        await db.update(user).set({
            expenseLastImport: now,
        });
    }
}

export async function getLastImport(userId: number) {
    return await db
        .select({
            revenueLastImport: user.revenueLastImport,
            expenseLastImport: user.expenseLastImport,
        })
        .from(user)
        .where(eq(user.id, userId));
}
