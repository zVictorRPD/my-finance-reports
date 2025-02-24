import { getLastImport, ImportData, registerLastImport } from "@/api/import";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import dayjs from 'dayjs'

export function ImportPage() {
    const [lastImports, setLastImports] = useState<{ revenue: string | null, expense: string | null }>({ revenue: null, expense: null });

    function handleFile(e: React.ChangeEvent<HTMLInputElement>, type: "revenue" | "expense") {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.name.endsWith('.csv')) {
            toast.error("O arquivo precisa ser um CSV");
            return;
        }
        if (e.target) {
            e.target.value = "";
        }
        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const counter = await ImportData(e.target?.result as string, type, 1);

                if (counter.accounts === 0 && counter.categories === 0 && counter.subcategories === 0 && counter.revenues === 0 && counter.expenses === 0) {
                    toast.warning("Nenhum dado novo encontrado no arquivo");
                    return;
                }

                await registerLastImport(type);

                if (type === "revenue") {
                    toast.success(
                        <div>
                            <p>Receitas importadas com sucesso!</p>
                            <p>{counter.accounts} novas contas</p>
                            <p>{counter.categories} novas categorias</p>
                            <p>{counter.subcategories} novas subcategorias</p>
                            <p>{counter.revenues} novas receitas</p>
                        </div>
                    );
                    setLastImports(prev => ({
                        ...prev,
                        revenue: dayjs().format("DD/MM/YYYY HH:mm")
                    }));
                    return;
                }

                toast.success(
                    <div>
                        <p>Despesas importadas com sucesso!</p>
                        <p>{counter.accounts} novas contas</p>
                        <p>{counter.categories} novas categorias</p>
                        <p>{counter.subcategories} novas subcategorias</p>
                        <p>{counter.expenses} novas despesas</p>
                    </div>
                );
                setLastImports(prev => ({
                    ...prev,
                    expense: dayjs().format("DD/MM/YYYY HH:mm")
                }));

            } catch (error) {
                toast.error("Erro ao importar arquivo");
            }

        }
        reader.readAsText(file as Blob);
    }

    async function getLastImports() {
        const lastImport = await getLastImport(1);
        if (lastImport.length > 0) {
            setLastImports({
                revenue: dayjs(lastImport[0].revenueLastImport).format("DD/MM/YYYY HH:mm"),
                expense: dayjs(lastImport[0].expenseLastImport).format("DD/MM/YYYY HH:mm")
            });
        }
    }

    useEffect(() => {
        getLastImports();
    }, []);

    return (
        <div className="grid md:grid-cols-2 gap-4 md:gap-0">
            <div className="flex flex-col items-center gap-2 md:border-r md:border-gray-200">
                <h2 className="text-2xl text-center font-semibold">Importar Receitas</h2>
                <p className="text-center text-gray-500">
                    {lastImports.revenue ? `Última importação dia: ${lastImports.revenue}` : "Nenhuma importação realizada"}
                </p>
                <img src="/images/revenue.svg" alt="Importar Receitas" className="w-full max-w-48 md:max-w-96" />
                <input
                    id="revenue-file"
                    type="file"
                    className="hidden"
                    onChange={e => handleFile(e, "revenue")}
                    accept=".csv"
                />
                <Button
                    className="w-full max-w-48 md:max-w-96"
                    asChild
                >
                    <Label htmlFor="revenue-file">
                        Importar
                    </Label>
                </Button>
            </div>
            <div className="flex flex-col items-center gap-2">
                <h2 className="text-2xl text-center font-semibold">Importar Despesas</h2>
                <p className="text-center text-gray-500">
                    {lastImports.expense ? `Última importação dia: ${lastImports.expense}` : "Nenhuma importação realizada"}
                </p>
                <img src="/images/expense.svg" alt="Importar Despesas" className="w-full max-w-48 md:max-w-96" />
                <input
                    id="expense-file"
                    type="file"
                    className="hidden"
                    onChange={e => handleFile(e, "expense")}
                    accept=".csv"
                />
                <Button
                    className="w-full max-w-48 md:max-w-96"
                    asChild
                >
                    <Label htmlFor="expense-file">
                        Importar
                    </Label>
                </Button>
            </div>
        </div>
    )
}