import { MetaTagAnalysis } from "@/types/seo";

/**
 * Analyze title tag for SEO best practices
 */
export function analyzeTitle(title: string | undefined): MetaTagAnalysis {
  if (!title) {
    return {
      name: "title",
      content: "",
      status: "error",
      message: "Missing title tag. Add a descriptive title between 50-60 characters."
    };
  }
  
  if (title.length < 30) {
    return {
      name: "title",
      content: title,
      status: "warning",
      message: "Title is too short. Aim for 50-60 characters for better visibility in search results."
    };
  }
  
  if (title.length > 70) {
    return {
      name: "title",
      content: title,
      status: "warning",
      message: "Title is too long. Search engines may truncate titles longer than 60 characters. Consider making it more concise."
    };
  }
  
  return {
    name: "title",
    content: title,
    status: "success",
    message: "Your title tag is within the recommended length. Good job!"
  };
}

/**
 * Analyze meta description for SEO best practices
 */
export function analyzeDescription(description: string | undefined): MetaTagAnalysis {
  if (!description) {
    return {
      name: "description",
      content: "",
      status: "error",
      message: "Missing meta description. Add a description between 140-160 characters to improve click-through rates."
    };
  }
  
  if (description.length < 100) {
    return {
      name: "description",
      content: description,
      status: "warning",
      message: "Description is too short. Aim for 140-160 characters for optimal visibility in search results."
    };
  }
  
  if (description.length > 160) {
    return {
      name: "description",
      content: description,
      status: "warning",
      message: "Description is too long. Search engines may truncate descriptions longer than 160 characters. Consider making it more concise."
    };
  }
  
  return {
    name: "description",
    content: description,
    status: "success",
    message: "Your meta description is within the recommended length. Good job!"
  };
}

/**
 * Calculate SEO score based on meta tags present
 */
export function calculateSEOScore(metaTags: Record<string, string>): number {
  let score = 0;
  let totalChecks = 0;
  
  // Check for essential tags
  const essentialTags = ["title", "description", "canonical", "robots"];
  essentialTags.forEach(tag => {
    if (metaTags[tag]) {
      score += 1;
    }
    totalChecks += 1;
  });
  
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
  
  // Calculate percentage score
  return Math.round((score / totalChecks) * 100);
}
