// src/hooks/useFAQ.js
import { useState } from 'react';

export const useFAQ = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const closeAllFaq = () => {
    setExpandedFaq(null);
  };

  const openFaq = (id) => {
    setExpandedFaq(id);
  };

  return {
    expandedFaq,
    toggleFaq,
    closeAllFaq,
    openFaq,
    isExpanded: (id) => expandedFaq === id
  };
};