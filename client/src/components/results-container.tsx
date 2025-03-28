import { useState } from "react";
import OverallScore from "./overall-score";
import TabInterface from "./tab-interface";
import { SEOAnalysisResult } from "@/types/seo";

interface ResultsContainerProps {
  result: SEOAnalysisResult;
}

export default function ResultsContainer({ result }: ResultsContainerProps) {
  const [activeTab, setActiveTab] = useState("search-preview");

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 slide-in-from-bottom-5">
      <OverallScore url={result.url} score={result.score} />
      
      <TabInterface 
        activeTab={activeTab} 
        onTabChange={handleTabChange} 
        result={result} 
      />
    </div>
  );
}
