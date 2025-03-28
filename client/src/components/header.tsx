import { Search, BookOpen, ExternalLink } from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Header() {
  const isMobile = useIsMobile();

  return (
    <header className="bg-background border-b sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex flex-wrap md:flex-nowrap items-center justify-between gap-y-2">
        {/* Logo and Title */}
        <div className="flex items-center gap-2.5">
          <div className="bg-primary/10 p-1.5 rounded-md">
            <Search className="h-5 w-5 text-primary" />
          </div>
          <h1 className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold tracking-tight text-foreground`}>
            SEO <span className="text-primary font-bold">Meta Tag</span> Inspector
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
