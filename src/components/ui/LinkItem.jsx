// src/components/ui/LinkItem.jsx
import React from 'react';

const LinkItem = ({ link, onClick }) => {
  const IconComponent = link.icon;
  
  return (
    <div
      onClick={() => onClick && onClick(link.id)}
      className="flex items-center space-x-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-700/30 cursor-pointer rounded-lg transition-colors"
    >
      {typeof link.icon === 'string' ? (
        <span className="text-sm">{link.icon}</span>
      ) : (
        <IconComponent className="w-4 h-4" />
      )}
      <span className="text-sm">{link.name}</span>
    </div>
  );
};

export default LinkItem;