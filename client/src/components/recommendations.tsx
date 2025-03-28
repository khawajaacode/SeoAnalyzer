import { AlertCircle, AlertTriangle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { SEORecommendation } from "@/types/seo";

interface RecommendationsProps {
  recommendations: SEORecommendation[];
}

export default function Recommendations({ recommendations }: RecommendationsProps) {
  // If no recommendations, show a success message
  if (recommendations.length === 0) {
    return (
      <div className="animate-in fade-in duration-300">
        <h3 className="text-lg font-medium text-gray-800 mb-4">SEO Recommendations</h3>
        
        <div className="border-l-4 border-green-500 bg-green-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            </div>
            <div className="ml-3">
              <h4 className="text-sm font-medium text-gray-800">Great job!</h4>
              <div className="mt-2 text-sm text-gray-600">
                <p>Your page has good SEO implementation. No critical issues were found.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-300">
      <h3 className="text-lg font-medium text-gray-800 mb-4">SEO Recommendations</h3>
      
      <div className="space-y-4">
        {recommendations.map((recommendation, index) => (
          <div 
            key={index}
            className={cn(
              "border-l-4 p-4",
              recommendation.type === "error" && "border-red-500 bg-red-50 bg-opacity-10",
              recommendation.type === "warning" && "border-amber-500 bg-amber-50 bg-opacity-10",
              recommendation.type === "success" && "border-green-500 bg-green-50 bg-opacity-10"
            )}
          >
            <div className="flex">
              <div className="flex-shrink-0">
                {recommendation.type === "error" && (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                )}
                {recommendation.type === "warning" && (
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                )}
                {recommendation.type === "success" && (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                )}
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-gray-800">{recommendation.title}</h4>
                <div className="mt-2 text-sm text-gray-600">
                  <p>{recommendation.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
