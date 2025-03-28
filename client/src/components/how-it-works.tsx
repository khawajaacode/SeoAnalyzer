import { Info, Check, Search, BarChart2, Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function HowItWorks() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Info className="h-5 w-5 text-primary" />
          <CardTitle className="text-xl font-montserrat">
            How My Tool Analyzes Your Website's SEO Meta Tags
          </CardTitle>
        </div>
        <CardDescription>
          A quick guide to understanding how this free tool works and how it can help improve your website's visibility
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-muted-foreground">
          Our tool fetches your website's HTML, extracts all meta tags, and analyzes them against SEO best practices. 
          Here's how to use it:
        </p>
        
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="mt-0.5 bg-primary/10 rounded-full p-1.5 h-8 w-8 flex items-center justify-center shrink-0">
              <Search className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-1">Input your website URL</h3>
              <p className="text-sm text-muted-foreground">
                Simply enter any public website URL in the search box above and click "Analyze SEO". 
                No sign-up or registration required!
              </p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="mt-0.5 bg-primary/10 rounded-full p-1.5 h-8 w-8 flex items-center justify-center shrink-0">
              <BarChart2 className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-1">Get instant SEO analysis</h3>
              <p className="text-sm text-muted-foreground">
                Within seconds, receive a comprehensive report with an overall SEO score, 
                detailed breakdown of all meta tags, and visual previews of how your page 
                appears in search results and social shares.
              </p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="mt-0.5 bg-primary/10 rounded-full p-1.5 h-8 w-8 flex items-center justify-center shrink-0">
              <Check className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-1">Review actionable recommendations</h3>
              <p className="text-sm text-muted-foreground">
                We provide specific, prioritized suggestions on how to improve your meta tags 
                based on current SEO best practices. Each recommendation includes easy-to-follow 
                implementation guidance.
              </p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="mt-0.5 bg-primary/10 rounded-full p-1.5 h-8 w-8 flex items-center justify-center shrink-0">
              <Download className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-1">Export and share your results</h3>
              <p className="text-sm text-muted-foreground">
                Save your SEO analysis as a PDF or CSV file to share with colleagues or clients, 
                or to refer back to as you implement improvements.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 bg-muted/50 p-4 rounded-md border">
          <p className="text-sm">
            <strong>💡 Pro Tip:</strong> This tool is completely free and provides immediate feedback on SEO best practices. 
            Use it regularly to monitor your progress as you implement improvements to your website's meta tags.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}