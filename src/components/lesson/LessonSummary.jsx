// src/components/lesson/LessonSummary.jsx
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const LessonSummary = ({ content, maxLength = 150 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!content) return null;

  const shouldTruncate = content.length > maxLength;
  const displayContent = shouldTruncate && !isExpanded 
    ? content.substring(0, maxLength) + '...' 
    : content;

  return (
    <div className="px-6 py-6">
      <h2 className="text-xl font-semibold text-white mb-4">Summary</h2>
      <div className="space-y-4">
        <p className="text-[#cccccc] max-w-3xl leading-relaxed text-base">
          {displayContent}
        </p>
        
        {shouldTruncate && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
          >
            {isExpanded ? (
              <>
                <span>Ver menos</span>
                <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                <span>Ver mais</span>
                <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default LessonSummary;