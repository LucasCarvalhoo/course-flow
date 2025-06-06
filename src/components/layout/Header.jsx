// src/components/layout/Header.jsx
import React from 'react';
import { ChevronLeft } from 'lucide-react';

const Header = ({ title, description, onBack, backText = "Modular" }) => {
  return (
    <div className="p-6">
      <button 
        onClick={onBack}
        className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-4"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="text-sm">{backText}</span>
      </button>
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      {description && (
        <p className="text-gray-400 max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
};

export default Header;