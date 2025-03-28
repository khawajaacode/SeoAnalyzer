import { Mail, Github, Linkedin } from "lucide-react";
import { useTheme } from "@/contexts/theme-context";
import { cn } from "@/lib/utils";

export default function Footer() {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn(
      "border-t py-6 transition-colors duration-200",
      isDarkMode 
        ? "bg-background/95 backdrop-blur-sm border-slate-800" 
        : "bg-background border-slate-200"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="text-sm text-muted-foreground order-2 sm:order-1">
            © {currentYear} Khawaja Babar Naseer
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 order-1 sm:order-2">
            {/* Email Link */}
            <a 
              href="mailto:kh.babar.naseer@gmail.com" 
              aria-label="Send email"
              className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-200"
            >
              <Mail className="h-4 w-4" />
            </a>

            {/* GitHub Link */}
            <a 
              href="https://github.com/khawajaacode" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-200"
            >
              <Github className="h-4 w-4" />
            </a>

            {/* LinkedIn Link */}
            <a 
              href="https://www.linkedin.com/in/kh-babar-naseer/" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-200"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}