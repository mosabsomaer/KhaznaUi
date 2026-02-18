
import React from 'react';

export const FigmaLogo: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => {
  return (
    <svg className={className} viewBox="0 0 38 67" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 28.5H9.5C4.25329 28.5 0 24.2467 0 19C0 13.7533 4.25329 9.5 9.5 9.5H19V28.5Z" fill="#F24E1E"/>
      <path d="M19 28.5H28.5C33.7467 28.5 38 24.2467 38 19C38 13.7533 33.7467 9.5 28.5 9.5H19V28.5Z" fill="#FF7262"/>
      <path d="M19 47.5H9.5C4.25329 47.5 0 43.2467 0 38C0 32.7533 4.25329 28.5 9.5 28.5H19V47.5Z" fill="#A259FF"/>
      <path d="M19 28.5C24.2467 28.5 28.5 32.7533 28.5 38C28.5 43.2467 24.2467 47.5 19 47.5V28.5Z" fill="#1ABCFE"/>
      <path d="M9.5 47.5C4.25329 47.5 0 51.7533 0 57C0 62.2467 4.25329 66.5 9.5 66.5C14.7467 66.5 19 62.2467 19 57V47.5H9.5Z" fill="#0ACF83"/>
    </svg>
  );
};
