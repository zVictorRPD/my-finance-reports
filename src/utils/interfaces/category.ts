export interface ICategory {
    id: number;
    name: string | null;
    type: string | null;
    userId: number | null;
}

export interface ISubcategory {
    id: number;
    name: string | null;
    categoryId: number | null;
}
