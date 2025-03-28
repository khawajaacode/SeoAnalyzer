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

// Schema for URL validation
export const urlSchema = z.object({
  url: z
    .string()
    .url({ message: "Please enter a valid URL including http:// or https://" })
    .trim(),
});

export type InsertSeoResult = z.infer<typeof insertSeoResultSchema>;
export type SeoResult = typeof seoResults.$inferSelect;
export type UrlInput = z.infer<typeof urlSchema>;
