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
        {recommendations
          .sort((a, b) => a.priority - b.priority)
          .map((rec, index) => (
            <div
              key={index}
              className={cn(
                "rounded-lg border p-4",
                rec.type === "error" && "border-red-500 bg-red-50 bg-opacity-10",
                rec.type === "warning" && "border-amber-500 bg-amber-50 bg-opacity-10",
                rec.type === "success" && "border-green-500 bg-green-50 bg-opacity-10"
              )}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium">{rec.title}</h3>
                <span className={cn(
                  "text-xs px-2 py-1 rounded",
                  rec.type === "error" && "bg-red-200 text-red-500",
                  rec.type === "warning" && "bg-amber-200 text-amber-500",
                  rec.type === "success" && "bg-green-200 text-green-500"
                )}>
                  Priority {rec.priority}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
              {rec.steps && (
                <div className="mt-2 space-y-2">
                  <h4 className="text-sm font-medium">Implementation Steps:</h4>
                  <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
                    {rec.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="pl-2">{step}</li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}