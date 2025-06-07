// src/components/lesson/LessonSummary.jsx
import React from 'react';

const LessonSummary = ({ content }) => {
  return (
    <div className="px-6 py-6">
      <h2 className="text-xl font-semibold text-white mb-4">Summary</h2>
      <p className="text-[#cccccc] max-w-3xl leading-relaxed text-base">
        {content}
      </p>
    </div>
  );
};

export default LessonSummary;