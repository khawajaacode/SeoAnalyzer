import { Eye, HelpCircle } from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Header() {
  const isMobile = useIsMobile();

  return (
    <header className="bg-background shadow-md border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Eye className="h-5 w-5 text-primary" />
          <h1 className={`${isMobile ? 'text-lg' : 'text-xl'} font-medium text-foreground`}>SEO Meta Tag Inspector</h1>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a 
            href="#" 
            className="text-primary hover:text-primary/80 transition-colors text-sm flex items-center gap-1"
            onClick={(e) => {
              e.preventDefault();
              window.open('https://developers.google.com/search/docs/fundamentals/seo-starter-guide', '_blank');
            }}
          >
            <HelpCircle className="h-4 w-4" />
            {!isMobile && <span>Help</span>}
          </a>
        </div>
      </div>
    </header>
  );
}
