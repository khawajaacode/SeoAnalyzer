
import { Moon, Sun, Star } from "lucide-react";
import { useTheme } from "@/contexts/theme-context";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={cn(
        "relative h-12 w-12 rounded-full flex items-center justify-center",
        "overflow-hidden transition-all duration-500 ease-out",
        "border focus:outline-none",
        isDark 
          ? `bg-slate-800/70 border-slate-700/50 shadow-lg shadow-slate-900/10
             hover:bg-slate-800/90 hover:border-primary/30 hover:shadow-primary/5`
          : `bg-amber-50/80 border-amber-100/50 shadow-md shadow-amber-100/30
             hover:bg-amber-50/95 hover:border-amber-200/80 hover:shadow-amber-200/20`
      )}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Background gradients */}
      <span 
        className={cn(
          "absolute inset-0 transition-opacity duration-700 ease-in-out",
          isDark 
            ? "opacity-100 bg-gradient-to-br from-slate-800/80 to-slate-900/50" 
            : "opacity-0 bg-gradient-to-br from-amber-50/90 to-amber-100/50"
        )}
      />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Stars for dark mode */}
        {Array.from({ length: 8 }).map((_, i) => (
          <span 
            key={`star-${i}`}
            className={cn(
              "absolute w-0.5 h-0.5 rounded-full bg-sky-100/70 transition-all duration-700",
              isDark ? "opacity-100" : "opacity-0",
              isHovering && isDark ? "animate-twinkle" : ""
            )}
            style={{
              top: `${15 + Math.random() * 70}%`,
              left: `${15 + Math.random() * 70}%`,
              animationDelay: `${Math.random() * 1.5}s`,
              transform: `scale(${1 + Math.random() * 1.5})`
            }}
          />
        ))}
        
        {/* Larger stars */}
        {Array.from({ length: 3 }).map((_, i) => (
          <Star 
            key={`bigstar-${i}`}
            className={cn(
              "absolute w-1 h-1 text-amber-100/30 transition-all duration-700 fill-amber-100/20",
              isDark ? "opacity-100" : "opacity-0",
              isHovering && isDark ? "animate-pulse" : ""
            )}
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${20 + Math.random() * 60}%`,
              transform: `scale(${0.5 + Math.random() * 0.5})`,
              animationDelay: `${Math.random() * 1}s`,
              animationDuration: `${1.5 + Math.random() * 2}s`
            }}
          />
        ))}
        
        {/* Sun rays for light mode */}
        {Array.from({ length: 6 }).map((_, i) => (
          <span 
            key={`ray-${i}`}
            className={cn(
              "absolute bg-amber-300/30 rounded-full transition-all duration-700",
              i % 2 === 0 ? "w-6 h-0.5" : "w-0.5 h-6",
              isDark ? "opacity-0" : "opacity-100",
              isHovering && !isDark ? "animate-pulse-slow" : ""
            )}
            style={{
              top: `${i % 2 === 0 ? 50 : 20 + Math.random() * 60}%`,
              left: `${i % 2 === 0 ? 20 + Math.random() * 60 : 50}%`,
              transform: `translate(-50%, -50%) rotate(${i * 30}deg)`,
              animationDelay: `${Math.random() * 0.5}s`,
              animationDuration: `${1.5 + Math.random() * 1}s`
            }}
          />
        ))}
      </div>
      
      {/* Main icon animation container */}
      <div 
        className={cn(
          "relative z-10 transition-all duration-500",
          "w-6 h-6",
          isHovering && "animate-float"
        )}
      >
        {/* Sun Icon with rays */}
        <div 
          className={cn(
            "absolute inset-0 transition-all duration-500 ease-out transform",
            isDark 
              ? "opacity-0 rotate-90 scale-50" 
              : "opacity-100 rotate-0 scale-100"
          )}
        >
          <Sun 
            className={cn(
              "w-6 h-6 text-amber-500",
              isHovering && !isDark && "animate-spin-slow"
            )} 
          />
        </div>
        
        {/* Moon Icon */}
        <div 
          className={cn(
            "absolute inset-0 transition-all duration-500 ease-out transform",
            isDark 
              ? "opacity-100 rotate-0 scale-100" 
              : "opacity-0 -rotate-90 scale-50"
          )}
        >
          <Moon 
            className={cn(
              "w-6 h-6 text-sky-100",
              isHovering && isDark && "animate-pulse-slow"
            )} 
          />
        </div>
      </div>
      
      {/* Status indicator dot */}
      <span 
        className={cn(
          "absolute bottom-1.5 right-1.5 w-1.5 h-1.5 rounded-full transition-all duration-500",
          isDark 
            ? "bg-sky-400/70" 
            : "bg-amber-400/70",
          isHovering && "animate-ping-once"
        )}
      />
    </button>
  );
}
