import { AlertCircle, AlertTriangle, CheckCircle, Globe, Hash, Share2, LineChart, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { SEOAnalysisResult } from "@/types/seo";
import { ReactNode } from "react";
import { useTheme } from "@/contexts/theme-context";

interface SEOSummaryCardsProps {
  result: SEOAnalysisResult;
  onTabChange: (tabName: string) => void;
}

// Define the score object type
interface ScoreInfo {
  score: number;
  total: number;
  percentage: number;
}

// Define the recommendation counts type
interface RecommendationCounts {
  errors: number;
  warnings: number;
  success: number;
}

// Base card interface
interface BaseCard {
  id: string;
  title: string;
  icon: ReactNode;
  description: string;
  tabTarget: string;
  accentColor: string;
  darkAccentColor: string;
}

// Score-specific card
interface ScoreCard extends BaseCard {
  type: "score";
  scoreInfo: ScoreInfo;
}

// Recommendation-specific card
interface RecommendationCard extends BaseCard {
  type: "recommendation";
  counts: RecommendationCounts;
}

// Union type for both card types
type Card = ScoreCard | RecommendationCard;

// Type guard functions
function isScoreCard(card: Card): card is ScoreCard {
  return card.type === "score";
}

function isRecommendationCard(card: Card): card is RecommendationCard {
  return card.type === "recommendation";
}

export default function SEOSummaryCards({ result, onTabChange }: SEOSummaryCardsProps) {
  const { metaTags, recommendations } = result;
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  // Calculate category scores
  const calculateCategoryScore = (category: "essential" | "social" | "technical"): ScoreInfo => {
    let score = 0;
    let total = 0;
    
    if (category === "essential") {
      // Essential tags: title, description, canonical, viewport
      const essentialTags = ["title", "description", "canonical", "viewport"];
      essentialTags.forEach(tag => {
        if (metaTags[tag]) {
          score++;
        }
        total++;
      });
    } else if (category === "social") {
      // Social tags: og:title, og:description, og:image, twitter:card, etc.
      const socialTags = [
        "og:title", "og:description", "og:image", "og:url", "og:type",
        "twitter:card", "twitter:title", "twitter:description", "twitter:image"
      ];
      socialTags.forEach(tag => {
        if (metaTags[tag]) {
          score++;
        }
        total++;
      });
    } else if (category === "technical") {
      // Technical tags: robots, language, charset, etc.
      const technicalTags = ["robots", "language", "charset", "viewport"];
      technicalTags.forEach(tag => {
        if (metaTags[tag]) {
          score++;
        }
        total++;
      });
    }
    
    return {
      score,
      total,
      percentage: total > 0 ? Math.round((score / total) * 100) : 0
    };
  };
  
  const essentialScore = calculateCategoryScore("essential");
  const socialScore = calculateCategoryScore("social");
  const technicalScore = calculateCategoryScore("technical");
  
  // Count recommendations by type
  const countRecommendationsByType = (): RecommendationCounts => {
    return {
      errors: recommendations.filter(r => r.type === "error").length,
      warnings: recommendations.filter(r => r.type === "warning").length,
      success: recommendations.filter(r => r.type === "success").length
    };
  };
  
  const recommendationCounts = countRecommendationsByType();
  
  // Helper for status color and icon
  const getStatusInfo = (percentage: number) => {
    if (percentage >= 80) {
      return { 
        color: isDark ? "bg-green-600/90" : "bg-green-500", 
        bgColor: isDark ? "bg-green-900/20" : "bg-green-50",
        borderColor: isDark ? "border-green-700/30" : "border-green-200",
        textColor: isDark ? "text-green-400" : "text-green-700", 
        icon: <CheckCircle className={`h-6 w-6 ${isDark ? "text-green-400" : "text-green-500"}`} /> 
      };
    } else if (percentage >= 50) {
      return { 
        color: isDark ? "bg-amber-600/90" : "bg-amber-500", 
        bgColor: isDark ? "bg-amber-900/20" : "bg-amber-50",
        borderColor: isDark ? "border-amber-700/30" : "border-amber-200",
        textColor: isDark ? "text-amber-400" : "text-amber-700", 
        icon: <AlertTriangle className={`h-6 w-6 ${isDark ? "text-amber-400" : "text-amber-500"}`} /> 
      };
    } else {
      return { 
        color: isDark ? "bg-red-600/90" : "bg-red-500", 
        bgColor: isDark ? "bg-red-900/20" : "bg-red-50",
        borderColor: isDark ? "border-red-700/30" : "border-red-200",
        textColor: isDark ? "text-red-400" : "text-red-700", 
        icon: <AlertCircle className={`h-6 w-6 ${isDark ? "text-red-400" : "text-red-500"}`} /> 
      };
    }
  };
  
  const cards: Card[] = [
    {
      id: "essential",
      type: "score",
      title: "Essential Meta Tags",
      scoreInfo: essentialScore,
      icon: <Globe className={`h-6 w-6 ${isDark ? "text-blue-400" : "text-blue-500"}`} />,
      description: "Title, description, and canonical tags",
      tabTarget: "meta-tags",
      accentColor: "#3B82F6", // blue-500
      darkAccentColor: "#60A5FA" // blue-400
    },
    {
      id: "social",
      type: "score",
      title: "Social Media Tags",
      scoreInfo: socialScore,
      icon: <Share2 className={`h-6 w-6 ${isDark ? "text-purple-400" : "text-purple-500"}`} />,
      description: "OpenGraph and Twitter Card tags",
      tabTarget: "social-previews",
      accentColor: "#8B5CF6", // purple-500
      darkAccentColor: "#A78BFA" // purple-400
    },
    {
      id: "technical",
      type: "score",
      title: "Technical SEO",
      scoreInfo: technicalScore,
      icon: <Hash className={`h-6 w-6 ${isDark ? "text-cyan-400" : "text-cyan-500"}`} />,
      description: "Robots, language, charset settings",
      tabTarget: "meta-tags",
      accentColor: "#06B6D4", // cyan-500
      darkAccentColor: "#22D3EE" // cyan-400
    },
    {
      id: "recommendations",
      type: "recommendation",
      title: "Recommendations",
      counts: recommendationCounts,
      icon: <LineChart className={`h-6 w-6 ${isDark ? "text-emerald-400" : "text-emerald-500"}`} />,
      description: `${recommendationCounts.errors} errors, ${recommendationCounts.warnings} warnings`,
      tabTarget: "recommendations",
      accentColor: "#10B981", // emerald-500
      darkAccentColor: "#34D399" // emerald-400
    }
  ];
  
  // Render a card based on its type
  const renderCardContent = (card: Card) => {
    const cardAccentColor = isDark ? card.darkAccentColor : card.accentColor;
    const statusInfo = isScoreCard(card) ? getStatusInfo(card.scoreInfo.percentage) : null;
    
    return (
      <div className="p-5 relative z-10 h-full">
        <div className="flex items-center justify-between mb-4">
          {/* Icon with glowing effect */}
          <div 
            className={cn(
              "p-3 rounded-xl relative",
              isDark ? "bg-slate-800/80" : "bg-white",
              "shadow-sm backdrop-blur-sm"
            )}
            style={{
              boxShadow: `0 0 10px ${cardAccentColor}20`
            }}
          >
            {/* Glow effect */}
            <div 
              className="absolute inset-0 rounded-xl opacity-20" 
              style={{ backgroundColor: cardAccentColor }}
            />
            <div className="relative z-10">
              {card.icon}
            </div>
          </div>
          
          {isScoreCard(card) ? (
            <div className="flex items-center">
              {statusInfo?.icon}
              <span className={`ml-1.5 text-xl font-bold ${statusInfo?.textColor}`}>
                {card.scoreInfo.percentage}%
              </span>
              {card.scoreInfo.percentage >= 80 && (
                <Sparkles className="h-3.5 w-3.5 ml-1 text-yellow-400 animate-pulse-slow" />
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {card.counts.errors > 0 && 
                <span className={cn(
                  "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
                  isDark ? "bg-red-900/30 text-red-400" : "bg-red-100 text-red-700"
                )}>
                  {card.counts.errors}
                </span>
              }
              {card.counts.warnings > 0 && 
                <span className={cn(
                  "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
                  isDark ? "bg-amber-900/30 text-amber-400" : "bg-amber-100 text-amber-700"
                )}>
                  {card.counts.warnings}
                </span>
              }
              {card.counts.success > 0 && 
                <span className={cn(
                  "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
                  isDark ? "bg-green-900/30 text-green-400" : "bg-green-100 text-green-700"
                )}>
                  {card.counts.success}
                </span>
              }
            </div>
          )}
        </div>
        
        <h3 className="text-lg font-medium font-montserrat text-foreground">{card.title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{card.description}</p>
        
        {isScoreCard(card) && (
          <div className="mt-4">
            <div className={cn(
              "w-full rounded-full h-2",
              isDark ? "bg-slate-700/80" : "bg-slate-200/80"
            )}>
              <div 
                className={cn(
                  `${statusInfo?.color} h-2 rounded-full transition-all duration-1000 ease-in-out`,
                )}
                style={{ 
                  width: `${card.scoreInfo.percentage}%`,
                  boxShadow: `0 0 4px ${cardAccentColor}80`
                }}
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs text-muted-foreground">{card.scoreInfo.score}/{card.scoreInfo.total} tags found</span>
              <span className="text-xs text-primary/80">View details</span>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 animate-in fade-in duration-500">
      {cards.map((card) => {
        const cardAccentColor = isDark ? card.darkAccentColor : card.accentColor;
        
        return (
          <div 
            key={card.id}
            className={cn(
              "relative rounded-xl overflow-hidden cursor-pointer group",
              "transition-all duration-300",
              "backdrop-blur-md border",
              "hover:shadow-lg",
              isDark 
                ? "bg-slate-900/60 border-slate-700/50 hover:bg-slate-900/70 hover:border-slate-600/60 hover:shadow-slate-900/30" 
                : "bg-white/90 border-slate-200/50 hover:bg-white hover:border-slate-300/50 hover:shadow-slate-200/30"
            )}
            onClick={() => onTabChange(card.tabTarget)}
          >
            {/* Glassmorphism decor elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div 
                className={cn(
                  "absolute -top-16 -right-8 w-24 h-24 rounded-full filter blur-2xl opacity-20 transition-opacity duration-300",
                  "group-hover:opacity-30"
                )}
                style={{ backgroundColor: cardAccentColor }}
              />
              <div 
                className={cn(
                  "absolute -bottom-16 -left-8 w-24 h-24 rounded-full filter blur-2xl opacity-10 transition-opacity duration-300",
                  "group-hover:opacity-20"
                )}
                style={{ backgroundColor: cardAccentColor }}
              />
            </div>
            
            {renderCardContent(card)}
            
            {/* Focus ring for accessibility and visual feedback */}
            <div 
              className={cn(
                "absolute inset-0 border-2 rounded-xl opacity-0 transition-opacity duration-300",
                "group-hover:opacity-100"
              )}
              style={{ borderColor: `${cardAccentColor}30` }}
            />
          </div>
        );
      })}
    </div>
  );
}