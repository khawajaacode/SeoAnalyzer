import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/contexts/theme-context";
import { useIsMobile } from "@/hooks/use-mobile";
import { Label } from "@/components/ui/label";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isMobile = useIsMobile();
  const isDark = theme === "dark";

  return (
    <div className="flex items-center gap-2">
      <Sun className="h-4 w-4 text-muted-foreground" />
      
      <Switch
        checked={isDark}
        onCheckedChange={toggleTheme}
        className="data-[state=checked]:bg-primary"
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      />
      
      <Moon className="h-4 w-4 text-muted-foreground" />
      
      {!isMobile && (
        <Label className="text-sm font-normal cursor-pointer" onClick={toggleTheme}>
          {isDark ? "Dark Mode" : "Light Mode"}
        </Label>
      )}
    </div>
  );
}