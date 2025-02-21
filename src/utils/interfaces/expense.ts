export interface IExpense {
    description: string;
    value: number;
    charges: number;
    release: string;
    dueDate: string;
    effectiveDate: string;
    recurrence: string;
    installment: number;
    installments: number;
    category: string;
    subcategory: string;
    card: string;
    account: string;
    notes: string;
    hash: string;
}