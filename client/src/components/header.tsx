import { Eye } from "lucide-react";
import { HelpCircle } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Eye className="h-5 w-5 text-primary" />
          <h1 className="text-xl font-medium text-gray-800">SEO Meta Tag Inspector</h1>
        </div>
        <a 
          href="#" 
          className="text-primary hover:text-primary/80 transition-colors text-sm flex items-center gap-1"
          onClick={(e) => {
            e.preventDefault();
            window.open('https://developers.google.com/search/docs/fundamentals/seo-starter-guide', '_blank');
          }}
        >
          <HelpCircle className="h-4 w-4" />
          <span>Help</span>
        </a>
      </div>
    </header>
  );
}
