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
          });
        } else if (metaTags.title.length > 70) {
          recommendations.push({
            type: "warning",
            title: "Title Tag Too Long",
            description: "Your title exceeds 70 characters. Search engines may truncate titles longer than 60 characters. Consider making it more concise.",
          });
        }
        
        if (!metaTags.description) {
          recommendations.push({
            type: "error",
            title: "Missing Meta Description",
            description: "Add a meta description between 140-160 characters to improve click-through rates from search results.",
          });
        } else if (metaTags.description.length < 100) {
          recommendations.push({
            type: "warning",
            title: "Meta Description Too Short",
            description: "Your meta description is too short. Aim for 140-160 characters for optimal visibility in search results.",
          });
        } else if (metaTags.description.length > 160) {
          recommendations.push({
            type: "warning",
            title: "Meta Description Too Long",
            description: "Your meta description exceeds 160 characters. Search engines may truncate it. Consider making it more concise.",
          });
        }
        
        if (!metaTags["og:image"]) {
          recommendations.push({
            type: "error",
            title: "Missing Open Graph Image",
            description: "Add an og:image tag. Images significantly increase engagement when content is shared on social media. Recommended size is 1200×630 pixels.",
          });
        }
        
        if (!metaTags["twitter:card"]) {
          recommendations.push({
            type: "warning",
            title: "Missing Twitter Card",
            description: "Add Twitter Card meta tags to improve how your content appears when shared on Twitter.",
          });
        }
        
        if (!metaTags.canonical) {
          recommendations.push({
            type: "warning",
            title: "Missing Canonical Tag",
            description: "Add a canonical tag to prevent duplicate content issues and consolidate link equity.",
          });
        }
        
        // Return the analysis result
        return res.json({
          url,
          metaTags,
          score: percentScore,
          recommendations,
          timestamp: new Date().toISOString(),
        });
        
      } catch (error) {
        console.error("Error fetching or parsing URL:", error);
        return res.status(500).json({
          message: "Failed to fetch or parse the URL",
          error: error.message,
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
        error: error.message,
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
