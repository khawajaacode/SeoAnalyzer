import { useState } from "react";
import URLInputForm from "@/components/url-input-form";
import ResultsContainer from "@/components/results-container";
import { SEOAnalysisResult } from "@/types/seo";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function Home() {
  const [analysisResult, setAnalysisResult] = useState<SEOAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const analyzeUrlMutation = useMutation({
    mutationFn: async (url: string) => {
      const response = await apiRequest("POST", "/api/analyze", { url });
      return response.json();
    },
    onSuccess: (data) => {
      setAnalysisResult(data);
    },
    onError: (error: Error) => {
      toast({
        title: "Error analyzing URL",
        description: error.message || "Please try again with a different URL",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const handleAnalyzeUrl = async (url: string) => {
    setIsLoading(true);
    analyzeUrlMutation.mutate(url);
  };

  return (
    <main className="container mx-auto px-4 py-6">
      <URLInputForm onSubmit={handleAnalyzeUrl} isLoading={isLoading} />
      
      {analysisResult && (
        <ResultsContainer result={analysisResult} />
      )}
    </main>
  );
}
