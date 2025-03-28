
import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/contexts/theme-context";
import { cn } from "@/lib/utils";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="flex items-center gap-2">
      <Sun 
        className={cn(
          "h-4 w-4 transition-all duration-200",
          isDark ? "text-[#FFFFFF] opacity-80 rotate-0" : "text-yellow-500 rotate-90"
        )} 
      />
      
      <Switch
        checked={isDark}
        onCheckedChange={toggleTheme}
        className="data-[state=checked]:bg-primary"
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      />
      
      <Moon 
        className={cn(
          "h-4 w-4 transition-all duration-200",
          isDark ? "text-[#FFFFFF] rotate-0" : "text-slate-400/50 -rotate-90"
        )} 
      />
    </div>
  );
}
