import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { urlSchema } from "@shared/schema";
import * as cheerio from "cheerio";
import fetch from "node-fetch";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route to analyze a URL's SEO meta tags
  app.post("/api/analyze", async (req, res) => {
    try {
      // Validate URL input
      const { url } = urlSchema.parse(req.body);
      
      try {
        // Fetch the HTML content
        const response = await fetch(url, {
          headers: {
            "User-Agent": "SEO-Inspector-Bot/1.0",
          },
        });

        if (!response.ok) {
          return res.status(400).json({
            message: `Failed to fetch page: ${response.status} ${response.statusText}`,
          });
        }

        const html = await response.text();
        const $ = cheerio.load(html);
        
        // Extract SEO meta tags
        const metaTags: Record<string, string> = {};
        
        // Extract title
        metaTags.title = $("title").text() || "";
        
        // Extract meta tags
        $("meta").each((_, element) => {
          const name = $(element).attr("name") || $(element).attr("property") || "";
          const content = $(element).attr("content") || "";
          
          if (name && content) {
            metaTags[name] = content;
          }
        });
        
        // Extract theme-color meta tag if available
        const themeColor = $('meta[name="theme-color"]').attr("content") || 
                          $('meta[name="msapplication-TileColor"]').attr("content") || "";
        
        // Extract canonical link
        const canonical = $('link[rel="canonical"]').attr("href") || "";
        if (canonical) {
          metaTags.canonical = canonical;
        }
        
        // Calculate basic SEO score
        let score = 0;
        let totalChecks = 0;
        
        // Check for title
        if (metaTags.title) {
          score += 1;
          totalChecks += 1;
        }
        
        // Check for description
        if (metaTags.description) {
          score += 1;
          totalChecks += 1;
        }
        
        // Check for Open Graph tags
        const ogTags = ["og:title", "og:description", "og:image", "og:type", "og:url"];
        ogTags.forEach(tag => {
          if (metaTags[tag]) {
            score += 1;
          }
          totalChecks += 1;
        });
        
        // Check for Twitter Card tags
        const twitterTags = ["twitter:card", "twitter:title", "twitter:description", "twitter:image"];
        twitterTags.forEach(tag => {
          if (metaTags[tag]) {
            score += 1;
          }
          totalChecks += 1;
        });
        
        // Check for canonical
        if (metaTags.canonical) {
          score += 1;
          totalChecks += 1;
        }
        
        // Check for robots
        if (metaTags.robots) {
          score += 1;
          totalChecks += 1;
        }
        
        // Calculate percentage score
        const percentScore = Math.round((score / totalChecks) * 100);
        
        // Generate recommendations based on missing tags
        const recommendations = [];
        
        if (!metaTags.title || metaTags.title.length < 10) {
          recommendations.push({
            type: "error",
            title: "Missing or Short Title Tag",
            description: "Add a descriptive title tag between 50-60 characters.",
            steps: [
              "Add a <title> tag in your HTML's <head> section",
              "Include your primary keyword near the beginning",
              "Format: Primary Keyword - Secondary Keyword | Brand Name",
              "Example: <title>SEO Analysis Tools - Meta Tag Inspector | YourBrand</title>"
            ],
            priority: 1
          });
        } else if (metaTags.title.length > 70) {
          recommendations.push({
            type: "warning",
            title: "Title Tag Too Long",
            description: "Your title exceeds 70 characters. Search engines may truncate titles longer than 60 characters.",
            steps: [
              "Identify core message and primary keyword",
              "Remove unnecessary words or redundant branding",
              "Keep most important information in first 50-60 characters",
              "Test visibility in search preview tool"
            ],
            priority: 2
          });
        }
        
        if (!metaTags.description) {
          recommendations.push({
            type: "error",
            title: "Missing Meta Description",
            description: "Add a meta description to improve click-through rates from search results.",
            steps: [
              "Add meta description tag in <head> section",
              "Include primary and secondary keywords naturally",
              "Add a clear call-to-action",
              "Example: <meta name=\"description\" content=\"Analyze your website's SEO meta tags instantly. Get actionable recommendations to improve search visibility and social sharing. Try our free tool today.\">"
            ],
            priority: 1
          });
        } else if (metaTags.description.length < 100) {
          recommendations.push({
            type: "warning",
            title: "Meta Description Too Short",
            description: "Your meta description is too short. Aim for 140-160 characters.",
            steps: [
              "Expand description to include more value propositions",
              "Add relevant keywords naturally",
              "Include a clear benefit statement",
              "End with a call-to-action"
            ],
            priority: 2
          });
        } else if (metaTags.description.length > 160) {
          recommendations.push({
            type: "warning",
            title: "Meta Description Too Long",
            description: "Your meta description exceeds 160 characters. Search engines may truncate it.",
            steps: [
              "Identify core message and unique value proposition",
              "Remove redundant information",
              "Keep call-to-action",
              "Test in search preview tool"
            ],
            priority: 2
          });
        }
        
        if (!metaTags["og:image"]) {
          recommendations.push({
            type: "error",
            title: "Missing Open Graph Image",
            description: "Add an og:image tag to improve social media sharing.",
            steps: [
              "Create image of 1200×630 pixels",
              "Add to your server in a public directory",
              "Add tag: <meta property=\"og:image\" content=\"https://yoursite.com/path/to/image.jpg\">",
              "Test using social media preview tools"
            ],
            priority: 3
          });
        }
        
        if (!metaTags["twitter:card"]) {
          recommendations.push({
            type: "warning",
            title: "Missing Twitter Card",
            description: "Add Twitter Card meta tags for better Twitter sharing.",
            steps: [
              "Add basic Twitter Card tags:",
              "<meta name=\"twitter:card\" content=\"summary_large_image\">",
              "<meta name=\"twitter:title\" content=\"Your Title\">",
              "<meta name=\"twitter:description\" content=\"Your Description\">",
              "<meta name=\"twitter:image\" content=\"URL to your image\">"
            ],
            priority: 3
          });
        }
        
        if (!metaTags.canonical) {
          recommendations.push({
            type: "warning",
            title: "Missing Canonical Tag",
            description: "Add a canonical tag to prevent duplicate content issues.",
            steps: [
              "Identify preferred version of the page",
              "Add in <head>: <link rel=\"canonical\" href=\"https://yoursite.com/preferred-page\">",
              "Ensure URL is absolute, not relative",
              "Verify implementation with inspection tools"
            ],
            priority: 2
          });
        }
        
        // Attempt to extract primary color from website
        let primaryColor = themeColor;
        
        // If no theme color meta tag, try to use brand colors from open graph
        if (!primaryColor && metaTags["og:image"]) {
          // Default to a common brand color if we can't extract one
          primaryColor = "#0366d6";
        }
        
        // Return the analysis result
        return res.json({
          url,
          metaTags,
          score: percentScore,
          recommendations,
          timestamp: new Date().toISOString(),
          primaryColor
        });
        
      } catch (error) {
        console.error("Error fetching or parsing URL:", error);
        return res.status(500).json({
          message: "Failed to fetch or parse the URL",
          error: error instanceof Error ? error.message : String(error),
        });
      }
      
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({
          message: validationError.message,
        });
      }
      
      return res.status(500).json({
        message: "An unexpected error occurred",
        error: error instanceof Error ? error.message : String(error),
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
