import { BookOpen, ExternalLink } from "lucide-react";
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
        ? "bg-[#1B222D]/95 backdrop-blur supports-[backdrop-filter]:bg-[#1B222D]/75 border-slate-800" 
        : "bg-[#F5F6F8]/95 backdrop-blur supports-[backdrop-filter]:bg-[#F5F6F8]/75 border-slate-200"
    )}>
      <div className="container mx-auto px-4 py-4 flex flex-wrap md:flex-nowrap items-center justify-between gap-y-2">
        {/* Logo and Title */}
        <div className="flex items-center gap-2.5">
          <div className={cn(
            "p-1.5 rounded-md transition-colors duration-200",
            isDarkMode ? "bg-slate-700/40" : "bg-slate-200/50"
          )}>
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className={cn("h-5 w-5", isDarkMode ? "text-[#FFFFFF]" : "text-primary")}
              stroke="currentColor"
            >
              <path d="M12 2L2 7L12 12L22 7L12 2Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
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
