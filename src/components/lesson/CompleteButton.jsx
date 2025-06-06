// src/components/lesson/CompleteButton.jsx
import React from 'react';
import Button from '../common/Button';

const CompleteButton = ({ onComplete, disabled = false, text = "Complete Lesson" }) => {
  return (
    <div className="w-full bg-white text-white py-3 px-4 rounded-lg font-medium hover:bg-[#404040] transition-colors text-center block">
      <Button 
        onClick={onComplete}
        disabled={disabled}
        variant="primary"
        size="md"
      >
        {text}
      </Button>
    </div>
  );
};

export default CompleteButton;