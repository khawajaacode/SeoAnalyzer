import { Button } from "@/components/ui/button";
import { DownloadCloud, FileText, FileSpreadsheet } from "lucide-react";
import { SEOAnalysisResult } from "@/types/seo";
import { exportToPDF, exportToCSV } from "@/utils/export-utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ExportButtonsProps {
  result: SEOAnalysisResult;
}

export default function ExportButtons({ result }: ExportButtonsProps) {
  const handleExportPDF = () => {
    exportToPDF(result);
  };

  const handleExportCSV = () => {
    exportToCSV(result);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <DownloadCloud size={16} />
          Export Report
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="cursor-pointer" onClick={handleExportPDF}>
          <FileText className="mr-2 h-4 w-4" />
          <span>Export as PDF</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={handleExportCSV}>
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          <span>Export as CSV</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}