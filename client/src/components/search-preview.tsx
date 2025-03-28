import MetaAnalysisCard from "./meta-analysis-card";

interface SearchPreviewProps {
  url: string;
  title: string;
  description: string;
}

export default function SearchPreview({ url, title, description }: SearchPreviewProps) {
  // Calculate title status
  const getTitleStatus = () => {
    if (!title) return { status: "error", message: "Missing title tag" };
    if (title.length < 30) return { status: "warning", message: "Title is too short" };
    if (title.length > 70) return { status: "warning", message: "Title is too long" };
    return { status: "success", message: "Good title length" };
  };

  // Calculate description status
  const getDescriptionStatus = () => {
    if (!description) return { status: "error", message: "Missing meta description" };
    if (description.length < 100) return { status: "warning", message: "Description is too short" };
    if (description.length > 160) return { status: "warning", message: "Description is too long" };
    return { status: "success", message: "Good description length" };
  };

  const titleAnalysis = getTitleStatus();
  const descriptionAnalysis = getDescriptionStatus();

  const getTitleWidth = () => {
    if (!title) return "0%";
    const percentage = (title.length / 70) * 100;
    return `${Math.min(percentage, 100)}%`;
  };

  const getDescriptionWidth = () => {
    if (!description) return "0%";
    const percentage = (description.length / 160) * 100;
    return `${Math.min(percentage, 100)}%`;
  };

  // Calculate color based on status
  const getStatusColor = (status: string) => {
    switch (status) {
      case "success": return "bg-green-500";
      case "warning": return "bg-amber-500";
      case "error": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="animate-in fade-in duration-300">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Google Search Preview</h3>
      
      {/* Google Search Result Preview */}
      <div className="border border-gray-200 rounded-lg p-4 max-w-2xl">
        <div className="flex flex-col">
          <div className="text-sm text-gray-500 truncate">{url}</div>
          <div className="text-xl text-blue-700 font-medium hover:underline cursor-pointer my-1">
            {title || "No title available"}
          </div>
          <div className="text-sm text-gray-700">
            {description || "No description available"}
          </div>
        </div>
      </div>

      {/* Title and Description Analysis */}
      <div className="mt-6 space-y-4">
        {/* Title Analysis */}
        <MetaAnalysisCard
          icon="title"
          title="Title Tag"
          status={titleAnalysis.status}
          currentLength={title ? title.length : 0}
          recommendedMin={50}
          recommendedMax={60}
          maxLength={70}
          barWidth={getTitleWidth()}
          barColor={getStatusColor(titleAnalysis.status)}
          message={titleAnalysis.message}
        />

        {/* Description Analysis */}
        <MetaAnalysisCard
          icon="description"
          title="Meta Description"
          status={descriptionAnalysis.status}
          currentLength={description ? description.length : 0}
          recommendedMin={140}
          recommendedMax={160}
          maxLength={160}
          barWidth={getDescriptionWidth()}
          barColor={getStatusColor(descriptionAnalysis.status)}
          message={descriptionAnalysis.message}
        />
      </div>
    </div>
  );
}
