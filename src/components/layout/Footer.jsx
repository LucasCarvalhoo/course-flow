// src/components/layout/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <div className="px-6 py-4 border-t border-gray-700/50 flex items-center justify-between text-sm text-gray-400">
      <span>Proudly built in</span>
      <span>CourseOS Template</span>
      <button className="hover:text-white transition-colors">
        Buy this template
      </button>
    </div>
  );
};

export default Footer;