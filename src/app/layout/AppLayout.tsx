import { AppSidebar } from "@/app/layout/AppSidebar"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { AppHeader } from "../layout/AppHeader"
import { Outlet } from "react-router"

export default function AppLayout() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <main className="w-full">
                    <AppHeader />
                    <div className="md:p-6 p-2 flex flex-col gap-4 md:gap-6">
                        <Outlet />
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}
