// src/components/lesson/DownloadsList.jsx
import React from 'react';
import { FileDown } from 'lucide-react';

const DownloadsList = ({ downloads, title = "Downloads" }) => {
  if (!downloads || downloads.length === 0) {
    return null;
  }

  const handleDownloadClick = (download) => {
    if (download.url) {
      // For downloads, we can either trigger direct download or open in new tab
      const link = document.createElement('a');
      link.href = download.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      
      // If it's a direct file download, set download attribute
      if (download.url.includes('.pdf') || 
          download.url.includes('.zip') || 
          download.url.includes('.docx') ||
          download.url.includes('.xlsx') ||
          download.url.match(/\.(pdf|zip|rar|docx|xlsx|pptx|txt|csv)$/i)) {
        link.download = download.title || 'download';
      }
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="px-6 py-6">
      <h2 className="text-xl font-semibold text-white mb-4">{title}</h2>
      <div className="space-y-3">
        {downloads.map((download) => (
          <div
            key={download.id}
            onClick={() => handleDownloadClick(download)}
            className="flex items-center gap-3 text-[#cccccc] hover:text-white transition-colors cursor-pointer group"
          >
            <FileDown className="w-4 h-4 text-green-400 group-hover:text-green-300 transition-colors flex-shrink-0" />
            <span className="text-sm group-hover:underline">
              {download.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DownloadsList;