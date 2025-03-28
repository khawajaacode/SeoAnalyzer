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
    <section className="mb-8">
      <div className="bg-card rounded-lg shadow-md p-6">
        <h2 className="text-lg font-medium text-foreground mb-4">
          Enter a website URL to inspect SEO meta tags
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col sm:flex-row gap-4">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormControl>
                    <div className="relative flex-grow">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Link className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <Input
                        {...field}
                        className="pl-10 pr-3 py-3"
                        placeholder="example.com"
                        disabled={isLoading}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit"
              className="px-5 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 sm:w-auto w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <span>Inspect SEO Tags</span>
              )}
            </Button>
          </form>
        </Form>
        <p className="text-xs text-muted-foreground mt-2">No need to type http:// or https://, we'll handle that for you!</p>
      </div>
    </section>
  );
}
