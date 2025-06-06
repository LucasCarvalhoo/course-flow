// src/components/ui/FAQItem.jsx
import React from 'react';
import { Plus, X } from 'lucide-react';

const FAQItem = ({ faq, isExpanded, onToggle }) => {
  return (
    <div className="bg-gray-800/50 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-800/70 transition-colors"
      >
        <span className="text-gray-300">{faq.title}</span>
        {isExpanded ? (
          <X className="w-4 h-4 text-gray-400" />
        ) : (
          <Plus className="w-4 h-4 text-gray-400" />
        )}
      </button>
      {isExpanded && (
        <div className="px-4 pb-3">
          <p className="text-gray-400 text-sm">{faq.content}</p>
        </div>
      )}
    </div>
  );
};

export default FAQItem;