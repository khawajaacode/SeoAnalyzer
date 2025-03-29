import { cn } from "@/lib/utils";
import SearchPreview from "./search-preview";
import SocialPreviews from "./social-previews";
import MetaTagsTable from "./meta-tags-table";
import Recommendations from "./recommendations";
import SEOCategoryBreakdown from "./seo-category-breakdown";
import { SEOAnalysisResult } from "@/types/seo";
import { useTheme } from "@/contexts/theme-context";
import { Search, Share2, PieChart, Code, ListTodo } from "lucide-react";
import { ReactNode } from "react";

interface TabInterfaceProps {
  activeTab: string;
  onTabChange: (tabName: string) => void;
  result: SEOAnalysisResult;
}

interface TabInfo {
  id: string;
  label: string;
  icon: ReactNode;
  accentColor: string;
  darkAccentColor: string;
}

export default function TabInterface({ activeTab, onTabChange, result }: TabInterfaceProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  const tabs: TabInfo[] = [
    { 
      id: "search-preview", 
      label: "Search Preview", 
      icon: <Search className="h-4 w-4" />,
      accentColor: "#3B82F6", // blue-500
      darkAccentColor: "#60A5FA" // blue-400
    },
    { 
      id: "social-previews", 
      label: "Social Previews", 
      icon: <Share2 className="h-4 w-4" />,
      accentColor: "#8B5CF6", // purple-500
      darkAccentColor: "#A78BFA" // purple-400
    },
    { 
      id: "breakdown", 
      label: "Tag Breakdown", 
      icon: <PieChart className="h-4 w-4" />,
      accentColor: "#F59E0B", // amber-500
      darkAccentColor: "#FBBF24" // amber-400
    },
    { 
      id: "meta-tags", 
      label: "Meta Tags", 
      icon: <Code className="h-4 w-4" />,
      accentColor: "#10B981", // emerald-500
      darkAccentColor: "#34D399" // emerald-400
    },
    { 
      id: "recommendations", 
      label: "Recommendations", 
      icon: <ListTodo className="h-4 w-4" />,
      accentColor: "#EC4899", // pink-500
      darkAccentColor: "#F472B6" // pink-400
    },
  ];

  return (
    <div className={cn(
      "relative rounded-xl overflow-hidden backdrop-blur-md border",
      isDark 
        ? "bg-slate-900/60 border-slate-700/50 shadow-xl shadow-slate-900/10" 
        : "bg-white/90 border-slate-200/50 shadow-xl shadow-slate-200/20"
    )}>
      {/* Glassmorphism decorative elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.id;
          const color = isDark ? tab.darkAccentColor : tab.accentColor;
          const position = (index / tabs.length) * 100;
          
          return isActive ? (
            <div 
              key={tab.id}
              className="absolute w-64 h-64 rounded-full filter blur-3xl opacity-10 transition-all duration-500"
              style={{ 
                backgroundColor: color, 
                top: '40%',
                left: `${position}%`,
                transform: 'translate(-50%, -50%)'
              }}
            />
          ) : null;
        })}
      </div>

      <div className={cn(
        "border-b relative z-10",
        isDark ? "border-slate-700/50" : "border-slate-200"
      )}>
        <nav className="flex -mb-px overflow-x-auto px-1 pt-1 scrollbar-none">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const color = isDark ? tab.darkAccentColor : tab.accentColor;
            
            return (
              <button
                key={tab.id}
                className={cn(
                  "relative whitespace-nowrap py-3 px-4 sm:px-6 border-b-2 font-medium text-sm transition-all duration-300 mx-1 group",
                  isActive
                    ? `text-foreground border-[${color}]`
                    : cn(
                        "border-transparent",
                        isDark 
                          ? "text-slate-400 hover:text-slate-300 hover:border-slate-700" 
                          : "text-slate-500 hover:text-slate-900 hover:border-slate-300"
                      )
                )}
                onClick={() => onTabChange(tab.id)}
                style={{ 
                  borderBottomColor: isActive ? color : undefined
                }}
              >
                {/* Background hover effect */}
                <div className={cn(
                  "absolute inset-0 rounded-t-lg transition-opacity duration-300 -z-10",
                  isActive 
                    ? "opacity-20"
                    : "opacity-0 group-hover:opacity-10"
                )}
                style={{ backgroundColor: color }}
                />
                
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "transition-colors duration-300",
                    isActive ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {tab.icon}
                  </span>
                  {tab.label}
                </div>
                
                {/* Active indicator dot */}
                {isActive && (
                  <span 
                    className="absolute -bottom-0.5 left-1/2 w-1 h-1 rounded-full transform -translate-x-1/2 translate-y-1/2"
                    style={{ backgroundColor: color }}
                  />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-6 relative z-10">
        <div className="animate-in fade-in duration-300">
          {activeTab === "search-preview" && (
            <SearchPreview 
              url={result.url} 
              title={result.metaTags.title || ""} 
              description={result.metaTags.description || ""} 
            />
          )}
          
          {activeTab === "social-previews" && (
            <SocialPreviews metaTags={result.metaTags} url={result.url} />
          )}
          
          {activeTab === "breakdown" && (
            <SEOCategoryBreakdown result={result} />
          )}
          
          {activeTab === "meta-tags" && (
            <MetaTagsTable metaTags={result.metaTags} />
          )}
          
          {activeTab === "recommendations" && (
            <Recommendations recommendations={result.recommendations} />
          )}
        </div>
      </div>
    </div>
  );
}
