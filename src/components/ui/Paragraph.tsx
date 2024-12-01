import React from 'react';

interface ParagraphProps {
  children: React.ReactNode;
  className?: string;
}

export const Paragraph: React.FC<ParagraphProps> = ({ children, className = '' }) => {
  return (
    <p className={`font-['system-ui'] text-base text-gray-600 dark:text-gray-300 ${className}`}>
      {children}
    </p>
  );
};