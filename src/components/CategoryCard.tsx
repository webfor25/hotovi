import React from 'react';
import { Category } from '../types';
import { Paragraph } from './ui/Paragraph';

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const Icon = category.icon;
  
  const handleClick = () => {
    window.location.hash = 'providers';
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('category', category.id);
    window.location.search = searchParams.toString();
  };
  
  return (
    <div 
      onClick={handleClick}
      className="flex flex-col bg-white dark:bg-gray-700 rounded-2xl shadow-sm transition-all hover:shadow-md p-6 cursor-pointer hover:scale-[1.02] duration-200"
    >
      <div className="mb-4">
        <span className="inline-flex items-center justify-center p-2 bg-[#fff2ee] dark:bg-[#ff572233] rounded-lg">
          <Icon className="h-6 w-6 text-[#ff5722]" />
        </span>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{category.name}</h3>
      <Paragraph>{category.description}</Paragraph>
    </div>
  );
};