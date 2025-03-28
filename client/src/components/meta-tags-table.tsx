import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface MetaTagsTableProps {
  metaTags: Record<string, string>;
}

export default function MetaTagsTable({ metaTags }: MetaTagsTableProps) {
  const getTagStatus = (name: string, content: string): {status: string, label: string} => {
    // Default status
    let status = "success";
    let label = "Good";
    
    if (!content) {
      return { status: "error", label: "Missing" };
    }
    
    // Special cases based on tag type
    switch (name) {
      case "title":
        if (content.length < 30) return { status: "warning", label: "Too Short" };
        if (content.length > 70) return { status: "warning", label: "Too Long" };
        break;
      case "description":
        if (content.length < 100) return { status: "warning", label: "Too Short" };
        if (content.length > 160) return { status: "warning", label: "Too Long" };
        break;
      case "canonical":
        // Nothing specific for canonical
        break;
      default:
        // For other tags, just check if they exist
        break;
    }
    
    return { status, label };
  };
  
  // Convert object to array for easy mapping
  const metaTagsList = Object.entries(metaTags).map(([name, content]) => ({
    name,
    content,
    ...getTagStatus(name, content)
  }));
  
  // Count tags with good status
  const goodTagsCount = metaTagsList.filter(tag => tag.status === "success").length;
  
  return (
    <div className="animate-in fade-in duration-300">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Detected Meta Tags</h3>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tag Type</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {metaTagsList.map((tag, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{tag.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                  {tag.content || "Not Found"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge 
                    className={cn(
                      "px-2 py-1",
                      tag.status === "success" && "bg-green-100 text-green-800",
                      tag.status === "warning" && "bg-amber-100 text-amber-800",
                      tag.status === "error" && "bg-red-100 text-red-800"
                    )}
                  >
                    {tag.label}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-600">
          Found {goodTagsCount} out of {metaTagsList.length} recommended SEO meta tags
        </p>
      </div>
    </div>
  );
}
