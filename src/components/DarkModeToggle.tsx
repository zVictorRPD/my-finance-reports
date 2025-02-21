import { MoonIcon, SunIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/providers/theme-provider';

interface IDarkModeToggleProps {
    className?: string;
}

export function DarkModeToggle({ className }: IDarkModeToggleProps) {
    const { theme, setTheme } = useTheme();

    function toggleTheme() {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    return (
        <Button variant="outline" size="icon" onClick={toggleTheme} type="button" className={className}>
            <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}