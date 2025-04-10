import { useState, useEffect } from "react";
import URLInputForm from "@/components/url-input-form";
import ResultsContainer from "@/components/results-container";
import HowItWorks from "@/components/how-it-works";
import { SEOAnalysisResult } from "@/types/seo";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useTheme } from "@/contexts/theme-context";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Home() {
  const [analysisResult, setAnalysisResult] = useState<SEOAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { setPrimaryColor } = useTheme();
  const isMobile = useIsMobile();

  // Reset primary color when component unmounts
  useEffect(() => {
    return () => {
      setPrimaryColor(null);
    };
  }, [setPrimaryColor]);

  const analyzeUrlMutation = useMutation({
    mutationFn: async (url: string) => {
      const response = await apiRequest("POST", "/api/analyze", { url });
      return response.json();
    },
    onSuccess: (data) => {
      setAnalysisResult(data);
      
      // Set primary color from analyzed website if available
      if (data.primaryColor) {
        setPrimaryColor(data.primaryColor);
      }
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
    <main className="container mx-auto px-4 py-6 relative">
      <div className="absolute inset-0 pointer-events-none" 
           style={{ background: 'var(--dynamic-background, transparent)' }} />
           
      <div className="relative z-10">
        <URLInputForm onSubmit={handleAnalyzeUrl} isLoading={isLoading} />
        
        {!analysisResult && (
          <HowItWorks />
        )}
        
        {analysisResult && (
          <ResultsContainer result={analysisResult} />
        )}
      </div>
    </main>
  );
}
