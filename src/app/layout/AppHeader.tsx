import { SidebarTrigger } from "@/components/ui/sidebar";
import { DarkModeToggle } from "@/components/DarkModeToggle";

export function AppHeader() {
    return (
        <header className="bg-background flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="mr-auto" />
            <DarkModeToggle /> 
        </header>
    )
}