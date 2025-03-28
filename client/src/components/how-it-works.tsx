import { Info, Check, Search, BarChart2, Download, Sparkles } from "lucide-react";
import { useTheme } from "@/contexts/theme-context";

export default function HowItWorks() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  return (
    <div className="mb-12 mt-4">
      {/* Section Title */}
      <div className="flex items-center gap-3 mb-8">
        <div className={`
          relative flex items-center justify-center h-12 w-12 rounded-xl
          ${isDark ? 'bg-primary/20' : 'bg-primary/10'}
          before:absolute before:inset-0 before:rounded-xl before:blur-sm
          ${isDark ? 'before:bg-primary/10' : 'before:bg-primary/5'}
        `}>
          <Info className="h-6 w-6 text-primary relative z-10" />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-montserrat font-semibold text-foreground">
            How My Tool Analyzes Your Website's SEO Meta Tags
          </h2>
          <p className="text-muted-foreground mt-1">
            A quick guide to understanding how this free tool works to improve your website's visibility
          </p>
        </div>
      </div>
      
      {/* Two-column layout for steps */}
      <div className={`
        relative rounded-xl p-6 md:p-8 overflow-hidden
        backdrop-blur-md border
        ${isDark 
          ? 'bg-slate-900/40 border-slate-700/50 shadow-lg' 
          : 'bg-white/70 border-slate-200/50 shadow-xl'
        }
      `}>
        {/* Glassmorphism decorative elements */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full filter blur-3xl opacity-30 z-0"></div>
        <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-blue-500/10 rounded-full filter blur-3xl opacity-20 z-0"></div>
        
        <div className="relative z-10">
          <p className="text-lg text-foreground/90 mb-8 font-montserrat">
            Our tool fetches your website's HTML, extracts all meta tags, and analyzes them against SEO best practices.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div className={`
                relative p-6 rounded-xl transition-all duration-300
                hover:shadow-md group
                ${isDark ? 'bg-slate-800/50 hover:bg-slate-800/70' : 'bg-white/80 hover:bg-white'}
              `}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-3">
                    <div className={`
                      flex items-center justify-center h-12 w-12 rounded-xl
                      group-hover:scale-110 transition-transform duration-300
                      ${isDark ? 'bg-primary/20' : 'bg-primary/10'}
                    `}>
                      <Search className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-montserrat font-medium text-foreground">Input your website URL</h3>
                  </div>
                  <p className="text-muted-foreground pl-16">
                    Simply enter any public website URL in the search box above and click "Analyze SEO". 
                    No sign-up or registration required!
                  </p>
                </div>
              </div>
              
              <div className={`
                relative p-6 rounded-xl transition-all duration-300
                hover:shadow-md group
                ${isDark ? 'bg-slate-800/50 hover:bg-slate-800/70' : 'bg-white/80 hover:bg-white'}
              `}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-3">
                    <div className={`
                      flex items-center justify-center h-12 w-12 rounded-xl
                      group-hover:scale-110 transition-transform duration-300
                      ${isDark ? 'bg-primary/20' : 'bg-primary/10'}
                    `}>
                      <BarChart2 className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-montserrat font-medium text-foreground">Get instant SEO analysis</h3>
                  </div>
                  <p className="text-muted-foreground pl-16">
                    Within seconds, receive a comprehensive report with an overall SEO score, 
                    detailed breakdown of all meta tags, and visual previews of how your page 
                    appears in search results and social shares.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Right Column */}
            <div className="space-y-6">
              <div className={`
                relative p-6 rounded-xl transition-all duration-300
                hover:shadow-md group
                ${isDark ? 'bg-slate-800/50 hover:bg-slate-800/70' : 'bg-white/80 hover:bg-white'}
              `}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-3">
                    <div className={`
                      flex items-center justify-center h-12 w-12 rounded-xl
                      group-hover:scale-110 transition-transform duration-300
                      ${isDark ? 'bg-primary/20' : 'bg-primary/10'}
                    `}>
                      <Check className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-montserrat font-medium text-foreground">Review recommendations</h3>
                  </div>
                  <p className="text-muted-foreground pl-16">
                    We provide specific, prioritized suggestions on how to improve your meta tags 
                    based on current SEO best practices. Each recommendation includes easy-to-follow 
                    implementation guidance.
                  </p>
                </div>
              </div>
              
              <div className={`
                relative p-6 rounded-xl transition-all duration-300
                hover:shadow-md group
                ${isDark ? 'bg-slate-800/50 hover:bg-slate-800/70' : 'bg-white/80 hover:bg-white'}
              `}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-3">
                    <div className={`
                      flex items-center justify-center h-12 w-12 rounded-xl
                      group-hover:scale-110 transition-transform duration-300
                      ${isDark ? 'bg-primary/20' : 'bg-primary/10'}
                    `}>
                      <Download className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-montserrat font-medium text-foreground">Export your results</h3>
                  </div>
                  <p className="text-muted-foreground pl-16">
                    Save your SEO analysis as a PDF or CSV file to share with colleagues or clients, 
                    or to refer back to as you implement improvements.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className={`
            mt-8 p-6 rounded-xl border border-primary/10
            ${isDark ? 'bg-primary/5' : 'bg-primary/5'}
            relative overflow-hidden
          `}>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-30"></div>
            <div className="flex gap-4 items-start relative z-10">
              <Sparkles className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-lg font-medium text-foreground mb-1">Pro Tip</h4>
                <p className="text-foreground/80">
                  This tool is completely free and provides immediate feedback on SEO best practices. 
                  Use it regularly to monitor your progress as you implement improvements to your website's meta tags.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}