export interface SEOAnalysisResult {
  url: string;
  metaTags: Record<string, string>;
  score: number;
  recommendations: SEORecommendation[];
  timestamp: string;
}

export interface SEORecommendation {
  type: "error" | "warning" | "success";
  title: string;
  description: string;
}

export interface MetaTagAnalysis {
  name: string;
  content: string;
  status: "success" | "warning" | "error";
  message: string;
}
