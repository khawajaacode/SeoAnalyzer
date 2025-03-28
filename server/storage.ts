import { seoResults, type SeoResult, type InsertSeoResult } from "@shared/schema";

// Storage interface for SEO analysis application
export interface IStorage {
  getSeoResult(id: number): Promise<SeoResult | undefined>;
  getSeoResultsByUrl(url: string): Promise<SeoResult[]>;
  createSeoResult(result: InsertSeoResult): Promise<SeoResult>;
}

export class MemStorage implements IStorage {
  private seoResults: Map<number, SeoResult>;
  currentId: number;

  constructor() {
    this.seoResults = new Map();
    this.currentId = 1;
  }

  async getSeoResult(id: number): Promise<SeoResult | undefined> {
    return this.seoResults.get(id);
  }

  async getSeoResultsByUrl(url: string): Promise<SeoResult[]> {
    return Array.from(this.seoResults.values()).filter(
      (result) => result.url === url,
    );
  }

  async createSeoResult(insertResult: InsertSeoResult): Promise<SeoResult> {
    const id = this.currentId++;
    // Ensure all properties have proper types to satisfy SeoResult interface
    const result: SeoResult = { 
      ...insertResult, 
      id,
      title: insertResult.title || null,
      description: insertResult.description || null,
      score: insertResult.score || null,
      analysisData: insertResult.analysisData || null
    };
    this.seoResults.set(id, result);
    return result;
  }
}

export const storage = new MemStorage();
