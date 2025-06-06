// src/components/lesson/LessonSummary.jsx
import React from 'react';

const LessonSummary = ({ content }) => {
  return (
    <div className="px-6 pb-6">
      <h2 className="text-xl font-semibold mb-3">Summary</h2>
      <p className="text-gray-400 max-w-3xl leading-relaxed">
        {content}
      </p>
    </div>
  );
};

export default LessonSummary;