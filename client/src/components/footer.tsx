import { Mail, Github, Linkedin, Heart } from "lucide-react";
import { useTheme } from "@/contexts/theme-context";
import { cn } from "@/lib/utils";

export default function Footer() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      href: "mailto:kh.babar.naseer@gmail.com",
      label: "Send email",
      icon: <Mail className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />,
    },
    {
      href: "https://github.com/khawajaacode",
      label: "GitHub profile",
      icon: <Github className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />,
      external: true,
    },
    {
      href: "https://www.linkedin.com/in/kh-babar-naseer/",
      label: "LinkedIn profile",
      icon: <Linkedin className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />,
      external: true,
    },
  ];

  return (
    <footer className={cn(
      "mt-16 border-t py-8 transition-all duration-300 relative overflow-hidden",
      isDark 
        ? "bg-slate-900/70 backdrop-blur-md border-slate-800/50" 
        : "bg-white/70 backdrop-blur-md border-slate-200/50"
    )}>
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className={cn(
          "absolute -top-32 right-1/4 w-64 h-64 rounded-full filter blur-3xl opacity-20",
          isDark ? "bg-primary/10" : "bg-primary/5"
        )} />
        <div className={cn(
          "absolute -bottom-20 left-1/3 w-48 h-48 rounded-full filter blur-3xl opacity-20",
          isDark ? "bg-primary/10" : "bg-primary/5"
        )} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Copyright and tagline */}
          <div className="flex flex-col items-center sm:items-start gap-2 order-2 sm:order-1">
            <div className="text-sm text-foreground/80 flex items-center gap-1.5">
              <span>© {currentYear} Khawaja Babar Naseer</span>
              <span className="text-primary/70">·</span>
              <span className="flex items-center gap-1">
                Made with <Heart className="h-3 w-3 text-red-500 animate-pulse-slow" /> for SEO
              </span>
            </div>
            <p className="text-xs text-muted-foreground text-center sm:text-left">
              Free tool to analyze and improve your website's SEO metadata
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3 order-1 sm:order-2">
            {socialLinks.map((link, index) => (
              <a 
                key={index}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                aria-label={link.label}
                className={cn(
                  "group",
                  "inline-flex items-center justify-center w-10 h-10 rounded-full",
                  "transition-all duration-300",
                  "border",
                  isDark 
                    ? "bg-slate-800/70 border-slate-700/50 text-slate-200 hover:text-primary hover:border-primary/50" 
                    : "bg-white/80 border-slate-200/70 text-slate-600 hover:text-primary hover:border-primary/30",
                  "hover:shadow-lg hover:scale-110",
                  isDark
                    ? "hover:shadow-primary/5"
                    : "hover:shadow-primary/10"
                )}
              >
                {link.icon}
                
                {/* Decorative ping effect on hover */}
                <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100">
                  <span className={cn(
                    "absolute inset-0 rounded-full animate-ping-once opacity-30",
                    isDark ? "bg-primary/20" : "bg-primary/10"
                  )}></span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}