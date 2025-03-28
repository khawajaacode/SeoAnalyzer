import { FaFacebookSquare, FaTwitter } from "react-icons/fa";
import { AlertTriangle, AlertCircle, ImageIcon } from "lucide-react";

interface SocialPreviewsProps {
  metaTags: Record<string, string>;
  url: string;
}

export default function SocialPreviews({ metaTags, url }: SocialPreviewsProps) {
  // Extract domain from URL
  const domain = url.replace(/^https?:\/\//, '').split('/')[0];
  
  // Facebook/OG data
  const ogTitle = metaTags["og:title"] || metaTags.title || "";
  const ogDescription = metaTags["og:description"] || metaTags.description || "";
  const ogImage = metaTags["og:image"] || "";
  
  // Twitter card data
  const twitterTitle = metaTags["twitter:title"] || ogTitle;
  const twitterDescription = metaTags["twitter:description"] || ogDescription;
  const twitterImage = metaTags["twitter:image"] || ogImage;
  const twitterCard = metaTags["twitter:card"];

  return (
    <div className="animate-in fade-in duration-300">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Social Media Previews</h3>
      
      <div className="space-y-8">
        {/* Facebook/OG Preview */}
        <div className="space-y-3">
          <h4 className="font-medium flex items-center gap-2 text-gray-700">
            <FaFacebookSquare className="w-5 h-5 text-blue-600" />
            Facebook / Open Graph Preview
          </h4>
          <div className="border border-gray-200 rounded-lg overflow-hidden max-w-md">
            <div className="bg-gray-200 h-52 flex items-center justify-center">
              {ogImage ? (
                <img 
                  src={ogImage} 
                  alt="Open Graph preview" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = `
                      <div class="text-gray-500 flex flex-col items-center w-full h-full justify-center">
                        <span class="mb-2"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg></span>
                        <span>Failed to load og:image</span>
                      </div>
                    `;
                  }}
                />
              ) : (
                <div className="text-gray-500 flex flex-col items-center">
                  <ImageIcon className="h-10 w-10 mb-2" />
                  <span>og:image would display here</span>
                  <span className="text-sm">(1200 × 630 recommended)</span>
                </div>
              )}
            </div>
            <div className="p-3 bg-white">
              <div className="text-xs text-gray-500 uppercase tracking-wide">{domain}</div>
              <h5 className="text-base font-bold my-1 text-gray-900">{ogTitle || "No title available"}</h5>
              <p className="text-sm text-gray-700">{ogDescription || "No description available"}</p>
            </div>
          </div>
          {!ogImage && (
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <span className="text-sm text-gray-600">Missing og:image tag. Add an image for better engagement.</span>
            </div>
          )}
        </div>

        {/* Twitter Card Preview */}
        <div className="space-y-3">
          <h4 className="font-medium flex items-center gap-2 text-gray-700">
            <FaTwitter className="w-5 h-5 text-blue-400" />
            Twitter Card Preview
          </h4>
          <div className="border border-gray-200 rounded-lg overflow-hidden max-w-md">
            <div className="bg-gray-200 h-52 flex items-center justify-center">
              {twitterImage ? (
                <img 
                  src={twitterImage} 
                  alt="Twitter Card preview" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = `
                      <div class="text-gray-500 flex flex-col items-center w-full h-full justify-center">
                        <span class="mb-2"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg></span>
                        <span>Failed to load twitter:image</span>
                      </div>
                    `;
                  }}
                />
              ) : (
                <div className="text-gray-500 flex flex-col items-center">
                  <ImageIcon className="h-10 w-10 mb-2" />
                  <span>twitter:image would display here</span>
                  <span className="text-sm">(1200 × 600 recommended)</span>
                </div>
              )}
            </div>
            <div className="p-3 bg-white">
              <h5 className="text-base font-bold mb-1 text-gray-900">{twitterTitle || "No title available"}</h5>
              <p className="text-sm text-gray-700 mb-2">{twitterDescription || "No description available"}</p>
              <div className="text-xs text-gray-500">{domain}</div>
            </div>
          </div>
          {!twitterCard && (
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <span className="text-sm text-gray-600">Twitter Card meta tags not detected. Add them for better Twitter sharing experience.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
