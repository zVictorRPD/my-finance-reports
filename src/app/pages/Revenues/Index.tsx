import { useEffect, useState } from "react";
import { DataTable } from "./components/DataTable";
import { columns } from "./components/TableColumns";
import { getRevenues, IGetRevenuesFilter } from "@/api/revenues";
import { IRevenue } from "@/utils/interfaces/revenue";

export function RevenuesPage() {
    const [filter, setFilter] = useState<IGetRevenuesFilter>({} as IGetRevenuesFilter);
    const [isLoading, setIsLoading] = useState(false);
    const [revenues, setRevenues] = useState<IRevenue[]>([]);
    const [summary, setSummary] = useState({
        total: 0,
        count: 0,
    });

    async function handleGetRevenues() {
        try {
            setIsLoading(true);
            const revenues = await getRevenues(filter);
            const total = revenues.reduce((acc, revenue) => acc + revenue.value / 100, 0);
            const count = revenues.length;
            setSummary({ total, count });
            setRevenues(revenues);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        handleGetRevenues();
    }, [])

    return (
        <>
            <div className="flex md:flex-row justify-between items-center gap-4">
                <h1 className="text-3xl font-bold">Receitas</h1>
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
            <DataTable
                columns={columns}
                data={revenues}
                isLoading={isLoading}
            />
        </>
    )
}