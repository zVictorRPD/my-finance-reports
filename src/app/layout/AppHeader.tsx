import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator"

export function AppHeader() {
    return (
        <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
        </header>
    )
}