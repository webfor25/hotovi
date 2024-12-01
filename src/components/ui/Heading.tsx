import React from 'react';

interface HeadingProps {
  children: React.ReactNode;
  className?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export const Heading: React.FC<HeadingProps> = ({ 
  children, 
  className = '', 
  level = 2 
}) => {
  const baseStyles = 'font-inter font-bold tracking-tight text-gray-900 dark:text-white';
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  const sizeStyles = {
    1: 'text-4xl sm:text-6xl',
    2: 'text-3xl sm:text-4xl',
    3: 'text-2xl sm:text-3xl',
    4: 'text-xl sm:text-2xl',
    5: 'text-lg sm:text-xl',
    6: 'text-base sm:text-lg',
  }[level];

  return (
    <Tag className={`${baseStyles} ${sizeStyles} ${className}`}>
      {children}
    </Tag>
  );
};