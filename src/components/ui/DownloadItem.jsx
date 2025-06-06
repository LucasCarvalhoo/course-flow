// src/components/ui/DownloadItem.jsx
import React from 'react';
import { FileDown } from 'lucide-react';

const DownloadItem = ({ download, onClick }) => {
  const handleClick = () => {
    if (download.url) {
      // Trigger download
      const link = document.createElement('a');
      link.href = download.url;
      link.download = download.title || download.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    if (onClick) {
      onClick(download);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center justify-between bg-gray-800/50 hover:bg-gray-800/70 rounded-lg px-4 py-3 cursor-pointer transition-colors group"
    >
      <div className="flex items-center space-x-3">
        <FileDown className="w-4 h-4 text-gray-400" />
        <span className="text-gray-300 group-hover:text-white transition-colors">
          {download.title || download.name}
        </span>
      </div>
    </div>
  );
};

export default DownloadItem;