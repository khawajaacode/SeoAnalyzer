import { useState } from "react";
import { 
  AlertCircle, AlertTriangle, CheckCircle, ChevronDown, ChevronUp, 
  ExternalLink, Sparkles, Trophy, Award
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SEOAnalysisResult } from "@/types/seo";
import { useTheme } from "@/contexts/theme-context";

interface OverallScoreProps {
  url: string;
  score: number;
  result?: SEOAnalysisResult;
}

export default function OverallScore({ url, score }: OverallScoreProps) {
  const [showDetails, setShowDetails] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  // Calculate circular progress parameters
  const radius = 15.9155;
  const circumference = 2 * Math.PI * radius;
  const dashArray = (score / 100) * circumference;
  
  // Get score rating information
  const getScoreInfo = () => {
    if (score >= 80) {
      return { 
        rating: "Excellent", 
        color: "text-green-600 dark:text-green-400", 
        lightColor: "#4CAF50",
        darkColor: "#66BB6A",
        circleColor: isDark ? "#66BB6A" : "#4CAF50",
        bgColor: isDark ? "bg-green-900/20" : "bg-green-50",
        borderColor: isDark ? "border-green-700/30" : "border-green-200",
        gradientFrom: isDark ? "from-green-800/20" : "from-green-100",
        gradientTo: isDark ? "to-green-900/0" : "to-green-50/0",
        icon: <CheckCircle className={`h-5 w-5 ${isDark ? "text-green-400" : "text-green-500"}`} />,
        celebrationIcon: <Trophy className={`h-6 w-6 ${isDark ? "text-green-400" : "text-green-500"}`} />,
        message: "Your page has strong SEO fundamentals."
      };
    }
    
    if (score >= 60) {
      return { 
        rating: "Good", 
        color: "text-amber-600 dark:text-amber-400", 
        lightColor: "#FFC107",
        darkColor: "#FFD54F",
        circleColor: isDark ? "#FFD54F" : "#FFC107",
        bgColor: isDark ? "bg-amber-900/20" : "bg-amber-50",
        borderColor: isDark ? "border-amber-700/30" : "border-amber-200",
        gradientFrom: isDark ? "from-amber-800/20" : "from-amber-100",
        gradientTo: isDark ? "to-amber-900/0" : "to-amber-50/0",
        icon: <AlertTriangle className={`h-5 w-5 ${isDark ? "text-amber-400" : "text-amber-500"}`} />,
        celebrationIcon: <Award className={`h-6 w-6 ${isDark ? "text-amber-400" : "text-amber-500"}`} />,
        message: "Your page meets most SEO requirements, but has areas for improvement."
      };
    }
    
    return { 
      rating: "Needs Work", 
      color: "text-red-600 dark:text-red-400", 
      lightColor: "#F44336",
      darkColor: "#EF5350",
      circleColor: isDark ? "#EF5350" : "#F44336",
      bgColor: isDark ? "bg-red-900/20" : "bg-red-50",
      borderColor: isDark ? "border-red-700/30" : "border-red-200",
      gradientFrom: isDark ? "from-red-800/20" : "from-red-100",
      gradientTo: isDark ? "to-red-900/0" : "to-red-50/0",
      icon: <AlertCircle className={`h-5 w-5 ${isDark ? "text-red-400" : "text-red-500"}`} />,
      celebrationIcon: <AlertCircle className={`h-6 w-6 ${isDark ? "text-red-400" : "text-red-500"}`} />,
      message: "Your page has significant SEO issues that should be addressed."
    };
  };
  
  const scoreInfo = getScoreInfo();
  
  // Extract domain from URL for display
  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname;
    } catch (e) {
      return url.split('/')[0];
    }
  };
  
  return (
    <section className={cn(
      "relative rounded-xl overflow-hidden backdrop-blur-md border",
      isDark 
        ? "bg-slate-900/60 border-slate-700/50 shadow-xl shadow-slate-900/10" 
        : "bg-white/90 border-slate-200/50 shadow-xl shadow-slate-200/20"
    )}>
      {/* Glassmorphism decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={cn(
          "absolute -top-24 right-1/3 w-48 h-48 rounded-full filter blur-3xl opacity-20",
          scoreInfo.gradientFrom
        )} />
        <div className={cn(
          "absolute bottom-0 left-1/4 w-32 h-32 rounded-full filter blur-3xl opacity-10",
          scoreInfo.gradientFrom
        )} />
      </div>

      <div className="p-6 sm:p-8 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-xl font-semibold font-montserrat text-foreground">SEO Analysis Results</h2>
              <div className={cn(
                "text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1", 
                scoreInfo.bgColor,
                scoreInfo.color,
                "border",
                scoreInfo.borderColor
              )}>
                {scoreInfo.celebrationIcon}
                <span>{scoreInfo.rating}</span>
                {score >= 80 && <Sparkles className="h-3 w-3 text-yellow-400 animate-pulse-slow" />}
              </div>
            </div>
            <div className="flex items-center text-muted-foreground">
              <span className="truncate max-w-[300px] text-sm">{getDomain(url)}</span>
              <a 
                href={url.startsWith('http') ? url : `https://${url}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="ml-1.5 inline-flex items-center text-primary hover:text-primary/80 transition-colors"
              >
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
            
            <div className="mt-4 sm:mt-6 md:mt-0 md:hidden">
              <CircularScoreDisplay 
                score={score} 
                dashArray={dashArray} 
                circumference={circumference} 
                scoreInfo={scoreInfo} 
              />
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-5">
            <CircularScoreDisplay 
              score={score} 
              dashArray={dashArray} 
              circumference={circumference} 
              scoreInfo={scoreInfo} 
            />
          </div>
        </div>
        
        <button 
          onClick={() => setShowDetails(!showDetails)}
          className={cn(
            "mt-4 w-full py-2 rounded-lg flex items-center justify-center gap-2",
            "text-sm font-medium transition-all duration-300",
            isDark 
              ? "bg-slate-800/60 hover:bg-slate-800/90 text-slate-200" 
              : "bg-slate-100/80 hover:bg-slate-200/80 text-slate-700",
            "border",
            isDark ? "border-slate-700/50" : "border-slate-200"
          )}
        >
          {showDetails ? (
            <>Hide Score Details <ChevronUp className="h-4 w-4" /></>
          ) : (
            <>View Score Details <ChevronDown className="h-4 w-4" /></>
          )}
        </button>
        
        {showDetails && (
          <div className={cn(
            "mt-5 p-5 text-sm rounded-xl",
            "backdrop-blur-sm transition-all duration-300",
            "border",
            scoreInfo.bgColor,
            scoreInfo.borderColor,
            "animate-in fade-in duration-300"
          )}>
            <div className="flex items-start gap-4">
              {scoreInfo.celebrationIcon}
              <div className="flex-1">
                <p className={`font-medium text-lg ${scoreInfo.color}`}>{scoreInfo.rating} ({score}/100)</p>
                <p className="mt-1 text-foreground/90">{scoreInfo.message}</p>
                
                <div className="mt-4">
                  <div className={`w-full ${isDark ? "bg-slate-700/70" : "bg-slate-200"} rounded-full h-2.5`}>
                    <div 
                      className="h-2.5 rounded-full transition-all duration-1000 ease-in-out"
                      style={{ 
                        width: `${score}%`, 
                        backgroundColor: scoreInfo.circleColor,
                        boxShadow: `0 0 8px ${isDark ? scoreInfo.darkColor + '60' : scoreInfo.lightColor + '40'}`
                      }}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span>0</span>
                    <span>Poor</span>
                    <span>Average</span>
                    <span>Good</span>
                    <span>100</span>
                  </div>
                </div>
                
                <div className="mt-4 text-sm space-y-2 border-t pt-3 border-slate-200/20">
                  <p><strong>What does this mean?</strong> This score represents how well your page implements SEO meta tags and best practices.</p>
                  <p>Review the detailed breakdown below for specific improvement opportunities.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

interface CircularScoreDisplayProps {
  score: number;
  dashArray: number;
  circumference: number;
  scoreInfo: any;
}

function CircularScoreDisplay({ score, dashArray, circumference, scoreInfo }: CircularScoreDisplayProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="flex items-center gap-5">
      <div className="relative h-28 w-28 group">
        {/* Circular progress background glow */}
        <div 
          className={cn(
            "absolute inset-0 rounded-full blur-md opacity-30 transition-opacity duration-300 z-0",
            "group-hover:opacity-60"
          )}
          style={{ backgroundColor: isDark ? scoreInfo.darkColor : scoreInfo.lightColor }}
        />
        
        {/* Circular progress indicator */}
        <svg className="w-full h-full relative z-10" viewBox="0 0 36 36">
          {/* Background circle */}
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}
            strokeWidth="3"
          />
          
          {/* Animated progress circle */}
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke={scoreInfo.circleColor}
            strokeWidth="3"
            strokeDasharray={`${dashArray}, ${circumference}`}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
            style={{
              filter: `drop-shadow(0 0 3px ${scoreInfo.circleColor}60)`
            }}
          />
        </svg>
        
        {/* Score text in the middle */}
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <span className={`text-4xl font-bold ${scoreInfo.color} transition-all duration-300 group-hover:scale-110`}>
            {score}
          </span>
        </div>
      </div>
      
      <div>
        <div className="flex items-center">
          {scoreInfo.icon}
          <p className={`ml-2 font-medium text-lg text-foreground`}>SEO Score</p>
        </div>
        <p className="text-sm text-muted-foreground mt-1">Based on detected meta tags</p>
        <div className="flex items-center gap-1 mt-2">
          {score >= 80 ? (
            <span className="inline-flex items-center text-xs bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-0.5 rounded-full">
              <CheckCircle className="h-3 w-3 mr-1" /> Passing
            </span>
          ) : (
            <span className="inline-flex items-center text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-full">
              <AlertTriangle className="h-3 w-3 mr-1" /> Needs improvement
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
