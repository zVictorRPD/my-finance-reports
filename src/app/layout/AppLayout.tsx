import { AppSidebar } from "@/app/layout/AppSidebar"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { AppHeader } from "../layout/AppHeader"
import { Outlet } from "react-router"
import { ThemeProvider } from "@/providers/theme-provider"
import { Toaster } from "@/components/ui/sonner"

export default function AppLayout() {
    return (
        <ThemeProvider>

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
            <Toaster
                position={"top-right"}
                closeButton={true}
                duration={3000}
            />
        </ThemeProvider>
    )
}
