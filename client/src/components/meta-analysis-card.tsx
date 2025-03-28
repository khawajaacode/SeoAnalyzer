import { useState } from "react";
import { 
  FileText, 
  AlignLeft, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle, 
  AlertTriangle, 
  AlertCircle 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MetaAnalysisCardProps {
  icon: string;
  title: string;
  status: string;
  currentLength: number;
  recommendedMin: number;
  recommendedMax: number;
  maxLength: number;
  barWidth: string;
  barColor: string;
  message: string;
}

export default function MetaAnalysisCard({
  icon,
  title,
  status,
  currentLength,
  recommendedMin,
  recommendedMax,
  maxLength,
  barWidth,
  barColor,
  message
}: MetaAnalysisCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleDetails = () => {
    setIsExpanded(!isExpanded);
  };

  const getStatusIcon = () => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = () => {
    const label = status === "success" ? "Good" : 
                 status === "warning" ? "Needs Improvement" : 
                 "Missing";
    
    return (
      <span className={cn(
        "text-sm px-2 py-1 rounded-full",
        status === "success" && "bg-green-100 text-green-800",
        status === "warning" && "bg-amber-100 text-amber-800",
        status === "error" && "bg-red-100 text-red-800"
      )}>
        {label}
      </span>
    );
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center">
          {icon === "title" ? (
            <FileText className="h-5 w-5 mr-2 text-gray-500" />
          ) : (
            <AlignLeft className="h-5 w-5 mr-2 text-gray-500" />
          )}
          <h4 className="font-medium">{title}</h4>
        </div>
        <div className="flex items-center gap-2">
          {getStatusBadge()}
          <button 
            className="text-gray-500 hover:text-gray-700 focus:outline-none" 
            aria-label="Toggle details"
            onClick={toggleDetails}
          >
            {isExpanded ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="p-4">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Current Length:</span>
              <span className="text-sm font-medium">{currentLength} characters</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`${barColor} h-2 rounded-full transition-all duration-300`} 
                style={{ width: barWidth }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>0</span>
              <span>Optimal: {recommendedMin}-{recommendedMax}</span>
              <span>{maxLength}</span>
            </div>
          </div>
          <div className="mt-3">
            <p className="text-sm text-gray-700">{message}</p>
          </div>
        </div>
      )}
    </div>
  );
}
