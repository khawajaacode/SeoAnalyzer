import { Button } from "@/components/ui/button";
import { DownloadCloud, FileSpreadsheet } from "lucide-react";
import { SEOAnalysisResult } from "@/types/seo";
import { exportToCSV } from "@/utils/export-utils";

interface ExportButtonsProps {
  result: SEOAnalysisResult;
}

export default function ExportButtons({ result }: ExportButtonsProps) {
  const handleExportCSV = () => {
    exportToCSV(result);
  };

  return (
    <Button variant="outline" className="gap-2" onClick={handleExportCSV}>
      <DownloadCloud size={16} />
      Export as CSV
    </Button>
  );
}