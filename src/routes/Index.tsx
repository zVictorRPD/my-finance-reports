import AppLayout from "@/app/layout/AppLayout";
import { DashboardPage } from "@/app/pages/Dashboard/Index";
import { ExpensesPage } from "@/app/pages/Expenses/Index";
import { ImportPage } from "@/app/pages/Import/Index";
import { RevenuesPage } from "@/app/pages/Revenues/Index";
import { FileMinusIcon, FilePlusIcon, ImportIcon, LayoutDashboardIcon } from "lucide-react";
import { Route, Routes } from "react-router";

export const RoutesData = [
    {
        id: "dashboard",
        title: "Dashboard",
        url: "/",
        icon: <LayoutDashboardIcon />,
        page: <DashboardPage />
    },
    {
        id: "revenues",
        title: "Receitas",
        url: "/receitas",
        icon: <FilePlusIcon />,
        page: <RevenuesPage />
    },
    {
        id: "expenses",
        title: "Despesas",
        url: "/despesas",
        icon: <FileMinusIcon />,
        page: <ExpensesPage />
    },
    {
        id: "import",
        title: "Importar",
        url: "/importar",
        icon: <ImportIcon />,
        page: <ImportPage />
    }
]

export function AppRoutes() {
    return (
        <Routes>
            <Route element={<AppLayout />}>
                {RoutesData.map((route) => (
                    <Route index={route.id == "dashboard"} key={route.id} path={route.url} element={route.page} />
                ))}
            </Route>
        </Routes>
    )
}