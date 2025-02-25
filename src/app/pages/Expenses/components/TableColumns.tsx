import { Button } from "@/components/ui/button"
import { customAlphabeticalTableSort, customDateTableSort, customValueTableSort } from "@/utils/functions/sort"
import { IRevenue } from "@/utils/interfaces/revenue"
import { ColumnDef } from "@tanstack/react-table"
import dayjs from "dayjs"
import { ArrowUpDownIcon } from "lucide-react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export const columns: ColumnDef<IRevenue>[] = [
    {
        accessorKey: "description",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Título
                    <ArrowUpDownIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        sortingFn: customAlphabeticalTableSort
    },
    {
        accessorKey: "category",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Categoria
                    <ArrowUpDownIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        sortingFn: customAlphabeticalTableSort
    },
    {
        accessorKey: "subcategory", 
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Subcategoria
                    <ArrowUpDownIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        sortingFn: customAlphabeticalTableSort
    },
    {
        accessorKey: "release",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Data
                    <ArrowUpDownIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        accessorFn: (row) => dayjs(row.release).format("DD/MM/YYYY"),
        sortingFn: customDateTableSort
    },
    {
        accessorKey: "account",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Conta
                    <ArrowUpDownIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        sortingFn: customAlphabeticalTableSort
    },
    {
        accessorKey: "value",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Valor
                    <ArrowUpDownIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        accessorFn: (row) => (row.value / 100).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        }),
        sortingFn: customValueTableSort
    }
]
