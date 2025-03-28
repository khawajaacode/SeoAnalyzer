import { useIsMobile } from "@/hooks/use-mobile";

export default function Footer() {
  const isMobile = useIsMobile();
  
  return (
    <footer className="bg-muted border-t mt-10">
      <div className="container mx-auto px-4 py-4">
        <p className="text-center text-muted-foreground text-xs sm:text-sm">
          {isMobile 
            ? "SEO Meta Tag Inspector" 
            : "SEO Meta Tag Inspector - Check and optimize your website's SEO meta tags"
          }
        </p>
      </div>
    </footer>
  );
}
