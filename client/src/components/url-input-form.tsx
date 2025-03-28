import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, Loader2 } from "lucide-react";
import { useTheme } from "@/contexts/theme-context";

// Client-side form schema with more user-friendly validation
const urlFormSchema = z.object({
  url: z
    .string()
    .min(1, { message: "Please enter a website URL" })
    .trim()
    .transform((value) => {
      // If URL doesn't start with http:// or https://, prepend https://
      if (!value.match(/^https?:\/\//i)) {
        return `https://${value}`;
      }
      return value;
    })
    .refine((value) => {
      try {
        new URL(value);
        return true;
      } catch (e) {
        return false;
      }
    }, { message: "Please enter a valid website URL" }),
});

type UrlFormValues = z.infer<typeof urlFormSchema>;

interface URLInputFormProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

export default function URLInputForm({ onSubmit, isLoading }: URLInputFormProps) {
  const { theme } = useTheme();
  
  const form = useForm<UrlFormValues>({
    resolver: zodResolver(urlFormSchema),
    defaultValues: {
      url: "",
    },
  });

  const handleSubmit = (values: UrlFormValues) => {
    onSubmit(values.url);
  };

  return (
    <section className="mb-10">
      {/* Glassmorphism Card */}
      <div className={`
        relative rounded-xl p-6 sm:p-8 
        backdrop-blur-md border overflow-hidden
        ${theme === 'dark' 
          ? 'bg-slate-900/60 border-slate-700/50 shadow-lg shadow-slate-900/20' 
          : 'bg-white/80 border-slate-200/50 shadow-xl shadow-slate-200/30'
        }
      `}>
        {/* Background decoration elements */}
        <div className="absolute -top-16 -right-16 w-32 h-32 bg-primary/20 rounded-full filter blur-2xl opacity-60 z-0"></div>
        <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-primary/10 rounded-full filter blur-2xl opacity-40 z-0"></div>
        
        <div className="relative z-10">
          <h2 className="text-xl sm:text-2xl font-medium font-montserrat text-foreground mb-5">
            Enter a website URL to inspect SEO meta tags
          </h2>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col sm:flex-row gap-4 sm:gap-5">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormControl>
                      <div className="relative flex-grow group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Link className={`h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary`} />
                        </div>
                        <Input
                          {...field}
                          className={`
                            pl-12 pr-4 py-6 h-auto text-base sm:text-lg rounded-xl
                            focus:ring-primary/30 focus:ring-4 focus:border-primary
                            transition-all duration-300 
                            ${theme === 'dark' ? 'bg-slate-800/75 border-slate-700/50' : 'bg-white/90 border-slate-200/50'}
                          `}
                          placeholder="example.com"
                          disabled={isLoading}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-sm ml-1 mt-1" />
                  </FormItem>
                )}
              />
              
              {/* Enhanced CTA button with animation */}
              <Button 
                type="submit"
                className={`
                  relative overflow-hidden px-6 py-6 h-auto text-base sm:text-lg rounded-xl font-medium
                  flex items-center justify-center gap-2 sm:w-auto w-full
                  transform transition-all duration-300 ease-out
                  hover:scale-105 focus:scale-105
                  bg-gradient-to-r from-primary to-primary/80
                  hover:from-primary/90 hover:to-primary
                  text-primary-foreground 
                  shadow-lg shadow-primary/25
                  hover:shadow-xl hover:shadow-primary/30
                  disabled:opacity-70 disabled:shadow-none
                `}
                disabled={isLoading}
              >
                {/* Animated background on hover */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[200%] hover:translate-x-[200%] transition-transform duration-1000 ease-in-out"></span>
                
                <span className="relative z-10 flex items-center gap-2 font-medium">
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <span>Analyze SEO</span>
                    </>
                  )}
                </span>
              </Button>
            </form>
          </Form>
          
          <p className="text-xs sm:text-sm text-muted-foreground mt-3 ml-1">No need to type http:// or https://, we'll handle that for you!</p>
        </div>
      </div>
    </section>
  );
}
