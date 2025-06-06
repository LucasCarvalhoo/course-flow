// src/components/lesson/CompleteButton.jsx
import React from 'react';
import Button from '../common/Button';

const CompleteButton = ({ onComplete, disabled = false, text = "Complete Lesson" }) => {
  return (
    <div className="px-6 pb-8">
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