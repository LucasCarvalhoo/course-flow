// src/components/ui/ResourceItem.jsx
import React from 'react';
import { ExternalLink } from 'lucide-react';

const ResourceItem = ({ resource, onClick }) => {
  const handleClick = () => {
    if (resource.url) {
      window.open(resource.url, '_blank');
    }
    if (onClick) {
      onClick(resource);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center justify-between bg-gray-800/50 hover:bg-gray-800/70 rounded-lg px-4 py-3 cursor-pointer transition-colors group"
    >
      <div className="flex items-center space-x-3">
        <ExternalLink className="w-4 h-4 text-gray-400" />
        <span className="text-gray-300 group-hover:text-white transition-colors">
          {resource.title || resource.name}
        </span>
      </div>
    </div>
  );
};

export default ResourceItem;