// src/components/common/Logo.jsx
import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-sm">❋</span>
      </div>
      <div>
        <h1 className="font-semibold text-white">CourseOS</h1>
        <p className="text-xs text-gray-400">Framer Template</p>
      </div>
    </div>
  );
};

export default Logo;