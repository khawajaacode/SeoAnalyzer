import { useState } from "react";
import { AlertCircle, AlertTriangle, CheckCircle, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface OverallScoreProps {
  url: string;
  score: number;
}

export default function OverallScore({ url, score }: OverallScoreProps) {
  const [showDetails, setShowDetails] = useState(false);
  
  // Calculate circular progress parameters
  const radius = 15.9155;
  const circumference = 2 * Math.PI * radius;
  const dashArray = (score / 100) * circumference;
  
  // Get score rating information
  const getScoreInfo = () => {
    if (score >= 80) {
      return { 
        rating: "Excellent", 
        color: "text-green-600", 
        circleColor: "#4CAF50",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        icon: <CheckCircle className="h-5 w-5 text-green-500" />,
        message: "Your page has strong SEO fundamentals."
      };
    }
    
    if (score >= 60) {
      return { 
        rating: "Good", 
        color: "text-amber-600", 
        circleColor: "#FFC107",
        bgColor: "bg-amber-50",
        borderColor: "border-amber-200",
        icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
        message: "Your page meets most SEO requirements, but has areas for improvement."
      };
    }
    
    return { 
      rating: "Needs Work", 
      color: "text-red-600", 
      circleColor: "#F44336",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      icon: <AlertCircle className="h-5 w-5 text-red-500" />,
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
    <section className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-medium text-gray-800">SEO Analysis Results</h2>
              <div className={cn(
                "text-xs font-medium px-2 py-0.5 rounded-full", 
                scoreInfo.bgColor,
                scoreInfo.color
              )}>
                {scoreInfo.rating}
              </div>
            </div>
            <div className="flex items-center mt-1 text-gray-600">
              <span className="truncate max-w-[300px]">{getDomain(url)}</span>
              <a 
                href={url.startsWith('http') ? url : `https://${url}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="ml-1 inline-flex items-center text-primary hover:underline"
              >
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative h-24 w-24">
              {/* Circular progress indicator */}
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#E6E6E6"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke={scoreInfo.circleColor}
                  strokeWidth="3"
                  strokeDasharray={`${dashArray}, ${circumference}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <span className={`text-3xl font-bold ${scoreInfo.color}`}>{score}</span>
              </div>
            </div>
            <div>
              <div className="flex items-center">
                {scoreInfo.icon}
                <p className="ml-1 font-medium text-gray-800">SEO Score</p>
              </div>
              <p className="text-sm text-gray-600 mt-1">Based on detected meta tags</p>
              <button 
                onClick={() => setShowDetails(!showDetails)}
                className="mt-2 text-xs flex items-center text-primary hover:underline"
              >
                {showDetails ? (
                  <>Hide Details <ChevronUp className="ml-1 h-3 w-3" /></>
                ) : (
                  <>View Details <ChevronDown className="ml-1 h-3 w-3" /></>
                )}
              </button>
            </div>
          </div>
        </div>
        
        {showDetails && (
          <div className={cn(
            "mt-4 p-4 text-sm rounded-lg",
            scoreInfo.bgColor,
            scoreInfo.borderColor,
            "border"
          )}>
            <div className="flex items-start">
              {scoreInfo.icon}
              <div className="ml-3">
                <p className="font-medium">{scoreInfo.rating} ({score}/100)</p>
                <p className="mt-1">{scoreInfo.message}</p>
                
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full" 
                      style={{ width: `${score}%`, backgroundColor: scoreInfo.circleColor }}
                    />
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-gray-500">
                    <span>0</span>
                    <span>Poor</span>
                    <span>Average</span>
                    <span>Good</span>
                    <span>100</span>
                  </div>
                </div>
                
                <div className="mt-3 text-xs">
                  <p><strong>What does this mean?</strong> This score represents how well your page implements SEO meta tags and best practices.</p>
                  <p className="mt-1">Review the detailed breakdown below for specific improvement opportunities.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
