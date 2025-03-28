import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import { SEOAnalysisResult, SEORecommendation } from '@/types/seo';

// Define types for jspdf-autotable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
    lastAutoTable: {
      finalY: number;
    };
  }
}

/**
 * Generate a PDF report from the SEO analysis result
 */
export const exportToPDF = (result: SEOAnalysisResult) => {
  const { url, metaTags, score, recommendations, timestamp } = result;
  
  // Initialize PDF document
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(20);
  doc.text('SEO Analysis Report', 14, 22);
  
  // Add URL and timestamp
  doc.setFontSize(12);
  doc.text(`URL: ${url}`, 14, 32);
  doc.text(`Generated: ${new Date(timestamp).toLocaleString()}`, 14, 38);
  
  // Add overall score
  doc.setFontSize(14);
  doc.text('Overall SEO Score', 14, 48);
  
  // Determine score color
  let scoreColor: [number, number, number] = [220, 53, 69]; // Red
  if (score >= 80) {
    scoreColor = [40, 167, 69]; // Green
  } else if (score >= 60) {
    scoreColor = [255, 193, 7]; // Yellow
  }
  
  // Draw score circle
  doc.setDrawColor(scoreColor[0], scoreColor[1], scoreColor[2]);
  doc.setFillColor(scoreColor[0], scoreColor[1], scoreColor[2]);
  doc.circle(30, 60, 10, 'F');
  
  // Add score text
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  const scoreX = score < 10 ? 27.5 : 26;
  doc.text(score.toString(), scoreX, 63);
  
  // Reset text color
  doc.setTextColor(0, 0, 0);
  
  // Add score description
  doc.setFontSize(12);
  let scoreRating = "Needs Improvement";
  if (score >= 80) {
    scoreRating = "Excellent";
  } else if (score >= 60) {
    scoreRating = "Good";
  }
  doc.text(`Rating: ${scoreRating}`, 45, 58);
  doc.text(`Score: ${score}/100`, 45, 64);
  
  // Add recommendations section
  doc.setFontSize(14);
  doc.text('Recommendations', 14, 80);
  
  const recommendationRows = recommendations.map(rec => [rec.type.toUpperCase(), rec.title, rec.description]);
  
  doc.autoTable({
    startY: 85,
    head: [['Type', 'Title', 'Description']],
    body: recommendationRows,
    headStyles: {
      fillColor: [52, 58, 64],
      textColor: [255, 255, 255]
    },
    bodyStyles: {
      fontSize: 10
    },
    columnStyles: {
      0: { cellWidth: 25 },
      1: { cellWidth: 50 },
      2: { cellWidth: 'auto' }
    },
    styles: {
      overflow: 'linebreak',
      cellPadding: 3
    },
    didDrawCell: (data: any) => {
      // Color the Type cell based on the recommendation type
      if (data.section === 'body' && data.column.index === 0) {
        const type = data.cell.raw as string;
        if (type === 'ERROR') {
          doc.setFillColor(220, 53, 69, 0.2); // Red with opacity
          doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height, 'F');
        } else if (type === 'WARNING') {
          doc.setFillColor(255, 193, 7, 0.2); // Yellow with opacity
          doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height, 'F');
        } else if (type === 'SUCCESS') {
          doc.setFillColor(40, 167, 69, 0.2); // Green with opacity
          doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height, 'F');
        }
      }
    }
  });
  
  // Add meta tags section
  const metaTagY = doc.lastAutoTable.finalY + 10;
  doc.setFontSize(14);
  doc.text('Meta Tags', 14, metaTagY);
  
  const metaTagRows = Object.entries(metaTags).map(([name, content]) => [name, content]);
  
  doc.autoTable({
    startY: metaTagY + 5,
    head: [['Meta Tag', 'Content']],
    body: metaTagRows,
    headStyles: {
      fillColor: [52, 58, 64],
      textColor: [255, 255, 255]
    },
    bodyStyles: {
      fontSize: 10
    },
    columnStyles: {
      0: { cellWidth: 50 },
      1: { cellWidth: 'auto' }
    },
    styles: {
      overflow: 'linebreak',
      cellPadding: 3
    }
  });
  
  // File name
  const domain = url.replace(/^https?:\/\//, '').split('/')[0];
  const fileName = `seo-report-${domain}-${new Date().toISOString().split('T')[0]}.pdf`;
  
  // Save the PDF
  doc.save(fileName);
};

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
  const allData = [
    ...summaryData,
    ...metaTagsData,
    ...recommendationsData
  ];
  
  // Convert to CSV
  const csv = Papa.unparse(allData);
  
  // Create Blob and download
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const domain = url.replace(/^https?:\/\//, '').split('/')[0];
  saveAs(blob, `seo-report-${domain}-${new Date().toISOString().split('T')[0]}.csv`);
};