import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import { SEOAnalysisResult } from '@/types/seo';

/**
 * Generate a CSV file from the SEO analysis result
 */
export const exportToCSV = (result: SEOAnalysisResult) => {
  const { url, metaTags, score, recommendations, timestamp } = result;

  // Prepare meta tags data
  const metaTagsData = Object.entries(metaTags).map(([name, content]) => ({
    type: 'meta_tag',
    name,
    content,
    url
  }));

  // Prepare recommendations data
  const recommendationsData = recommendations.map(rec => ({
    type: 'recommendation',
    severity: rec.type,
    title: rec.title,
    description: rec.description,
    url
  }));

  // Prepare summary data
  const summaryData = [{
    type: 'summary',
    url,
    score,
    generated_at: new Date(timestamp).toISOString(),
    total_meta_tags: Object.keys(metaTags).length,
    total_recommendations: recommendations.length
  }];

  // Combine all data
  const allData = [...summaryData, ...metaTagsData, ...recommendationsData];

  // Convert to CSV
  const csv = Papa.unparse(allData);

  // Create and save file
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const domain = url.replace(/^https?:\/\//, '').split('/')[0];
  saveAs(blob, `seo-report-${domain}-${new Date().toISOString().split('T')[0]}.csv`);
};