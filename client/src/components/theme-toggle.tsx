import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/theme-context";
import { useIsMobile } from "@/hooks/use-mobile";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isMobile = useIsMobile();

  return (
    <Button
      variant="ghost"
      size={isMobile ? "icon" : "default"}
      onClick={toggleTheme}
      className="transition-colors duration-200"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === "light" ? (
        <>
          <Moon className="h-5 w-5" />
          {!isMobile && <span className="ml-2">Dark Mode</span>}
        </>
      ) : (
        <>
          <Sun className="h-5 w-5" />
          {!isMobile && <span className="ml-2">Light Mode</span>}
        </>
      )}
    </Button>
  );
}