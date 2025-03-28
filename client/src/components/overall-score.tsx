import { CircleCheck, AlertCircle } from "lucide-react";

interface OverallScoreProps {
  url: string;
  score: number;
}

export default function OverallScore({ url, score }: OverallScoreProps) {
  // Determine score color based on value
  const getScoreColor = () => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-amber-600";
    return "text-red-600";
  };

  // Determine circle color based on value
  const getCircleColor = () => {
    if (score >= 80) return "#4CAF50";
    if (score >= 60) return "#FFC107";
    return "#F44336";
  };

  // Calculate circle properties
  const radius = 15.9155;
  const circumference = 2 * Math.PI * radius;
  const dashArray = (score / 100) * circumference;

  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-medium text-gray-800">SEO Analysis Results</h2>
          <p className="text-gray-600 break-all">{url}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative h-20 w-20">
            {/* Circular progress indicator */}
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#E6E6E6"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke={getCircleColor()}
                strokeWidth="3"
                strokeDasharray={`${dashArray}, ${circumference}`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <span className={`text-2xl font-bold ${getScoreColor()}`}>{score}</span>
            </div>
          </div>
          <div>
            <p className="font-medium text-gray-800">SEO Score</p>
            <p className="text-sm text-gray-600">Based on detected meta tags</p>
          </div>
        </div>
      </div>
    </section>
  );
}
