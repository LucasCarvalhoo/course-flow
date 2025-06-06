// src/components/ui/ModuleItem.jsx
import React from 'react';

const ModuleItem = ({ module, onClick }) => {
  return (
    <div
      onClick={() => onClick && onClick(module.id)}
      className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
        module.active 
          ? 'bg-gray-700/50 text-white' 
          : 'text-gray-400 hover:text-white hover:bg-gray-700/30'
      }`}
    >
      <span className="text-sm">{module.icon}</span>
      <span className="text-sm">{module.name}</span>
    </div>
  );
};

export default ModuleItem;