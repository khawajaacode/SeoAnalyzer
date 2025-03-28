import { AlertCircle, AlertTriangle, CheckCircle, Globe, Hash, Share2, LineChart } from "lucide-react";
import { cn } from "@/lib/utils";
import { SEOAnalysisResult } from "@/types/seo";
import { ReactNode } from "react";

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
      return { color: "bg-green-500", textColor: "text-green-700", icon: <CheckCircle className="h-6 w-6 text-green-500" /> };
    } else if (percentage >= 50) {
      return { color: "bg-amber-500", textColor: "text-amber-700", icon: <AlertTriangle className="h-6 w-6 text-amber-500" /> };
    } else {
      return { color: "bg-red-500", textColor: "text-red-700", icon: <AlertCircle className="h-6 w-6 text-red-500" /> };
    }
  };
  
  const cards: Card[] = [
    {
      id: "essential",
      type: "score",
      title: "Essential Meta Tags",
      scoreInfo: essentialScore,
      icon: <Globe className="h-6 w-6 text-gray-500" />,
      description: "Title, description, and other basic SEO tags",
      tabTarget: "meta-tags"
    },
    {
      id: "social",
      type: "score",
      title: "Social Media Tags",
      scoreInfo: socialScore,
      icon: <Share2 className="h-6 w-6 text-gray-500" />,
      description: "Facebook OpenGraph, Twitter Cards",
      tabTarget: "social-previews"
    },
    {
      id: "technical",
      type: "score",
      title: "Technical SEO",
      scoreInfo: technicalScore,
      icon: <Hash className="h-6 w-6 text-gray-500" />,
      description: "Robots, language, charset settings",
      tabTarget: "meta-tags"
    },
    {
      id: "recommendations",
      type: "recommendation",
      title: "Recommendations",
      counts: recommendationCounts,
      icon: <LineChart className="h-6 w-6 text-gray-500" />,
      description: `${recommendationCounts.errors} errors, ${recommendationCounts.warnings} warnings`,
      tabTarget: "recommendations"
    }
  ];
  
  // Render a card based on its type
  const renderCardContent = (card: Card) => {
    return (
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-gray-100 rounded-full">
            {card.icon}
          </div>
          
          {isScoreCard(card) ? (
            <div className="flex items-center">
              {getStatusInfo(card.scoreInfo.percentage).icon}
              <span className={`ml-1 text-lg font-semibold ${getStatusInfo(card.scoreInfo.percentage).textColor}`}>
                {card.scoreInfo.percentage}%
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {card.counts.errors > 0 && 
                <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
                  {card.counts.errors}
                </span>
              }
              {card.counts.warnings > 0 && 
                <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">
                  {card.counts.warnings}
                </span>
              }
            </div>
          )}
        </div>
        
        <h3 className="font-medium text-gray-900">{card.title}</h3>
        <p className="text-sm text-gray-500 mt-1">{card.description}</p>
        
        {isScoreCard(card) && (
          <div className="mt-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`${getStatusInfo(card.scoreInfo.percentage).color} h-2 rounded-full`} 
                style={{ width: `${card.scoreInfo.percentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-500">{card.scoreInfo.score}/{card.scoreInfo.total} tags found</span>
              <span className="text-xs text-gray-500">Click to view details</span>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in duration-300">
      {cards.map((card) => (
        <div 
          key={card.id}
          className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onTabChange(card.tabTarget)}
        >
          {renderCardContent(card)}
        </div>
      ))}
    </div>
  );
}