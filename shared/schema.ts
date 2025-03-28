import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Define SEO analysis result schema
export const seoResults = pgTable("seo_results", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  title: text("title"),
  description: text("description"),
  score: integer("score"),
  analysisData: text("analysis_data"),
  createdAt: text("created_at").notNull(),
});

// Schema for inserting SEO results
export const insertSeoResultSchema = createInsertSchema(seoResults).omit({
  id: true,
});

// Schema for URL validation with protocol handling
export const urlSchema = z.object({
  url: z
    .string()
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

export type InsertSeoResult = z.infer<typeof insertSeoResultSchema>;
export type SeoResult = typeof seoResults.$inferSelect;
export type UrlInput = z.infer<typeof urlSchema>;
