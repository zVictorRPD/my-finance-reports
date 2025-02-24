import { IRevenue } from "@/utils/interfaces/revenue"
import { ColumnDef } from "@tanstack/react-table"
import dayjs from "dayjs"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export const columns: ColumnDef<IRevenue>[] = [
    {
        accessorKey: "description",
        header: "Título",
    },
    {
        accessorKey: "category",
        header: "Categoria",
    },
    {
        accessorKey: "subcategory",
        header: "Subcategoria",
    },
    {
        accessorKey: "release",
        header: "Data",
        accessorFn: (row) => dayjs(row.release).format("DD/MM/YYYY"),
    },
    {
        accessorKey: "account",
        header: "Conta",
    },
    {
        accessorKey: "value",
        header: "Valor",
        accessorFn: (row) => (row.value / 100).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        }),
    }
]
