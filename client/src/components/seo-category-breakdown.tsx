import { SEOAnalysisResult } from "@/types/seo";
import { AlertCircle, AlertTriangle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryBreakdownProps {
  result: SEOAnalysisResult;
}

// A complete list of SEO meta tags organized by category
const tagCategories = {
  essential: {
    name: "Essential Tags",
    description: "Core tags required for basic SEO",
    tags: ["title", "description", "canonical", "viewport"]
  },
  social: {
    name: "Social Media",
    description: "Tags for social media platforms",
    tags: [
      "og:title", "og:description", "og:image", "og:url", "og:type",
      "twitter:card", "twitter:title", "twitter:description", "twitter:image"
    ]
  },
  technical: {
    name: "Technical",
    description: "Technical SEO settings",
    tags: ["robots", "language", "charset", "viewport", "revisit-after"]
  }
};

export default function SEOCategoryBreakdown({ result }: CategoryBreakdownProps) {
  const { metaTags } = result;
  
  // Analyze tags in a category
  const analyzeCategoryTags = (category: keyof typeof tagCategories) => {
    const { tags } = tagCategories[category];
    const foundTags = tags.filter(tag => metaTags[tag]);
    const percentage = Math.round((foundTags.length / tags.length) * 100);
    
    return {
      found: foundTags,
      missing: tags.filter(tag => !metaTags[tag]),
      percentage
    };
  };
  
  // Get status badge and icon based on percentage
  const getStatusInfo = (percentage: number) => {
    if (percentage >= 80) {
      return { 
        status: "success", 
        label: "Good", 
        icon: <CheckCircle className="h-5 w-5 text-green-500" />,
        color: "text-green-700",
        bgColor: "bg-green-50"
      };
    } else if (percentage >= 50) {
      return { 
        status: "warning", 
        label: "Needs Improvement", 
        icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
        color: "text-amber-700",
        bgColor: "bg-amber-50"
      };
    } else {
      return { 
        status: "error", 
        label: "Critical", 
        icon: <AlertCircle className="h-5 w-5 text-red-500" />,
        color: "text-red-700",
        bgColor: "bg-red-50"
      };
    }
  };
  
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <h3 className="text-lg font-medium text-gray-800 mb-4">SEO Tag Breakdown</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(Object.keys(tagCategories) as Array<keyof typeof tagCategories>).map(category => {
          const analysis = analyzeCategoryTags(category);
          const statusInfo = getStatusInfo(analysis.percentage);
          
          return (
            <div 
              key={category}
              className={cn(
                "relative rounded-lg overflow-hidden border",
                statusInfo.status === "success" && "border-green-200",
                statusInfo.status === "warning" && "border-amber-200",
                statusInfo.status === "error" && "border-red-200"
              )}
            >
              {/* Status bar at top */}
              <div className={cn(
                "h-1.5 w-full", 
                statusInfo.status === "success" && "bg-green-500",
                statusInfo.status === "warning" && "bg-amber-500",
                statusInfo.status === "error" && "bg-red-500"
              )} />
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{tagCategories[category].name}</h4>
                  <div className="flex items-center">
                    {statusInfo.icon}
                    <span className={`ml-1 text-sm font-medium ${statusInfo.color}`}>
                      {analysis.percentage}%
                    </span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">
                  {tagCategories[category].description}
                </p>
                
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div 
                    className={cn(
                      "h-2 rounded-full",
                      statusInfo.status === "success" && "bg-green-500",
                      statusInfo.status === "warning" && "bg-amber-500",
                      statusInfo.status === "error" && "bg-red-500"
                    )}
                    style={{ width: `${analysis.percentage}%` }} 
                  />
                </div>
                
                {/* Found tags */}
                {analysis.found.length > 0 && (
                  <div className="mb-3">
                    <h5 className="text-xs font-medium text-gray-700 uppercase tracking-wider mb-1.5">Found Tags</h5>
                    <div className="flex flex-wrap gap-1">
                      {analysis.found.map(tag => (
                        <span 
                          key={tag} 
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Missing tags */}
                {analysis.missing.length > 0 && (
                  <div>
                    <h5 className="text-xs font-medium text-gray-700 uppercase tracking-wider mb-1.5">Missing Tags</h5>
                    <div className="flex flex-wrap gap-1">
                      {analysis.missing.map(tag => (
                        <span 
                          key={tag} 
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}