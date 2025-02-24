import { useEffect, useState } from "react";
import { DataTable } from "./components/DataTable";
import { columns } from "./components/TableColumns";
import { getExpenses, IGetExpensesFilter } from "@/api/expenses";
import { IExpense } from "@/utils/interfaces/expense";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multiple-select";
import { ICategory, ISubcategory } from "@/utils/interfaces/category";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { getCategories, getSubcategories } from "@/api/categories";
import { ptBR } from "date-fns/locale/pt-BR";

export function ExpensesPage() {
    const [filter, setFilter] = useState<IGetExpensesFilter>({} as IGetExpensesFilter);
    const [isLoading, setIsLoading] = useState(false);
    const [expenses, setExpenses] = useState<IExpense[]>([]);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [subcategories, setSubcategories] = useState<ISubcategory[]>([]);
    const [summary, setSummary] = useState({
        total: 0,
        count: 0,
    });

    async function handleGetCategories() {
        try {
            const categories = await getCategories();
            setCategories(categories);
        } catch (error) {
            console.error(error);
        }
    }

    async function handleGetSubcategories() {
        try {
            const subcategories = await getSubcategories();
            setSubcategories(subcategories);
        } catch (error) {
            console.error(error);
        }
    }

    async function handleGetExpenses() {
        try {
            setIsLoading(true);
            const expenses = await getExpenses(filter);
            const total = expenses.reduce((acc, expense) => acc + expense.value / 100, 0);
            const count = expenses.length;
            setSummary({ total, count });
            setExpenses(expenses);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }


    useEffect(() => {
        handleGetCategories();
        handleGetSubcategories();
        handleGetExpenses();
    }, []);

    return (
        <>
            <div className="flex md:flex-row justify-between items-center gap-4">
                <h1 className="text-3xl font-bold">Despesas</h1>
                <div className="flex flex-col">
                    <span className="text-xl">
                        Valor total: {summary.total.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                        })}
                    </span>
                    <span className="text-md">
                        Número de registros: {summary.count}
                    </span>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-3">
                <div className="col-span-1 flex flex-col gap-1.5">
                    <Label htmlFor="description">Título</Label>
                    <Input
                        type="text"
                        id="description"
                        value={filter.description}
                        onChange={e => setFilter({ ...filter, description: e.target.value })}
                    />
                </div>
                <div className="col-span-1 flex flex-col gap-1.5">
                    <Label htmlFor="release">Data</Label>
                    <div className={"grid gap-2"}>
                        <Popover>
                            <PopoverTrigger>
                                <Button
                                    id="date"
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !filter.date_start && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon />
                                    {filter.date_start ? (
                                        filter.date_end ? (
                                            <>
                                                {format(filter.date_start, "dd/LLL/y")} -{" "}
                                                {format(filter.date_end, "dd/LLL/y")}
                                            </>
                                        ) : (
                                            format(filter.date_start, "dd/LLL/y")
                                        )
                                    ) : (
                                        <span>Selecione uma data</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    initialFocus
                                    mode="range"
                                    defaultMonth={filter.date_start || new Date()}
                                    selected={{
                                        from: filter.date_start,
                                        to: filter.date_end,
                                    }}
                                    onSelect={(date) => {
                                        setFilter({
                                            ...filter,
                                            date_start: date?.from,
                                            date_end: date?.to,
                                        });
                                    }}
                                    numberOfMonths={2}
                                    locale={ptBR}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <div className="col-span-1 flex flex-col gap-1.5">
                    <Label htmlFor="description">Categoria</Label>
                    <MultiSelect
                        options={categories.map((category) => {
                            return {
                                label: category.name || "",
                                value: String(category.id),
                            }
                        })}
                        onValueChange={(values) => setFilter({ ...filter, categories: values })}
                        defaultValue={filter.categories}
                        placeholder="Selecione as categorias"
                        variant="inverted"
                        animation={2}
                        maxCount={99}
                    />
                </div>
                {/* <div className="col-span-1 flex flex-col gap-1.5">
                    <Label htmlFor="description">Subcategoria</Label>
                    <MultiSelect
                        options={
                            subcategories
                                .filter((subcategory) => filter.categories?.includes(String(subcategory.categoryId)))
                                .map((subcategory) => {
                                    return {
                                        label: subcategory.name || "",
                                        value: String(subcategory.id),
                                    }
                                })
                        }
                        onValueChange={(values) => setFilter({ ...filter, categories: values })}
                        defaultValue={filter.subcategories}
                        placeholder="Select frameworks"
                        variant="inverted"
                        animation={2}
                        maxCount={3}
                    />
                </div> */}
            </div>
            <DataTable
                columns={columns}
                data={expenses}
                isLoading={isLoading}
            />
        </>
    )
}