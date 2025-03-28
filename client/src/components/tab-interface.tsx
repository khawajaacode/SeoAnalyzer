import { cn } from "@/lib/utils";
import SearchPreview from "./search-preview";
import SocialPreviews from "./social-previews";
import MetaTagsTable from "./meta-tags-table";
import Recommendations from "./recommendations";
import SEOCategoryBreakdown from "./seo-category-breakdown";
import { SEOAnalysisResult } from "@/types/seo";

interface TabInterfaceProps {
  activeTab: string;
  onTabChange: (tabName: string) => void;
  result: SEOAnalysisResult;
}

export default function TabInterface({ activeTab, onTabChange, result }: TabInterfaceProps) {
  const tabs = [
    { id: "search-preview", label: "Search Preview" },
    { id: "social-previews", label: "Social Previews" },
    { id: "breakdown", label: "Tag Breakdown" },
    { id: "meta-tags", label: "Meta Tags" },
    { id: "recommendations", label: "Recommendations" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={cn(
                "whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm transition-colors",
                activeTab === tab.id
                  ? "text-primary border-primary"
                  : "text-gray-500 hover:text-gray-700 hover:border-gray-300 border-transparent"
              )}
              onClick={() => onTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-6">
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
  );
}
