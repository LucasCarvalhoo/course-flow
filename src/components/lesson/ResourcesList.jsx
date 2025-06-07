// src/components/lesson/ResourcesList.jsx
import React from 'react';
import { ExternalLink } from 'lucide-react';

const ResourcesList = ({ resources, title = "Resources" }) => {
  if (!resources || resources.length === 0) {
    return null;
  }

  const handleResourceClick = (resource) => {
    if (resource.url) {
      window.open(resource.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="px-6 py-6">
      <h2 className="text-xl font-semibold text-white mb-4">{title}</h2>
      <div className="space-y-3">
        {resources.map((resource) => (
          <div
            key={resource.id}
            onClick={() => handleResourceClick(resource)}
            className="flex items-center gap-3 text-[#cccccc] hover:text-white transition-colors cursor-pointer group"
          >
            <ExternalLink className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-colors flex-shrink-0" />
            <span className="text-sm group-hover:underline">
              {resource.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourcesList;