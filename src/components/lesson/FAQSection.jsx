// src/components/lesson/FAQSection.jsx
import React from 'react';
import FAQItem from '../ui/FAQItem';
import { useFAQ } from '../../hooks/useFAQ';

const FAQSection = ({ faqItems, title = "FAQ" }) => {
  const { expandedFaq, toggleFaq } = useFAQ();

  if (!faqItems || faqItems.length === 0) {
    return null;
  }

  return (
    <div className="px-6 pb-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="space-y-2">
        {faqItems.map((faq) => (
          <FAQItem 
            key={faq.id} 
            faq={faq} 
            isExpanded={expandedFaq === faq.id}
            onToggle={() => toggleFaq(faq.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default FAQSection;