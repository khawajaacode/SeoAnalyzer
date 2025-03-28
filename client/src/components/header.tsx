import { Search, BookOpen, ExternalLink } from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/theme-context";

export default function Header() {
  const isMobile = useIsMobile();
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <header className={cn(
      "border-b sticky top-0 z-50 transition-colors duration-200",
      isDarkMode 
        ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75 border-slate-800" 
        : "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75 border-slate-200"
    )}>
      <div className="container mx-auto px-4 py-4 flex flex-wrap md:flex-nowrap items-center justify-between gap-y-2">
        {/* Logo and Title */}
        <div className="flex items-center gap-2.5">
          <div className={cn(
            "p-1.5 rounded-md transition-colors duration-200",
            isDarkMode ? "bg-primary/20" : "bg-primary/10"
          )}>
            <Search className="h-5 w-5 text-primary" />
          </div>
          <h1 className={`${isMobile ? 'text-lg md:text-xl' : 'text-xl md:text-2xl'} tracking-tight text-foreground font-montserrat uppercase`}>
            <span className="font-bold">SEO</span>{" "}
            <span className="font-medium text-muted-foreground">META TAG</span>{" "}
            <span className="font-bold">INSPECTOR</span>
          </h1>
        </div>
        
        {/* Right Side Controls */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          <Separator orientation="vertical" className="h-6 hidden md:block" />
          
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground gap-1.5"
            onClick={() => {
              window.open('https://developers.google.com/search/docs/fundamentals/seo-starter-guide', '_blank');
            }}
          >
            <BookOpen className="h-4 w-4" />
            <span className={isMobile ? "sr-only" : ""}>SEO Guide</span>
            <ExternalLink className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </header>
  );
}
