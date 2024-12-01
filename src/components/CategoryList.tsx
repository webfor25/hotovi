import React, { useState } from 'react';
import { CategoryCard } from './CategoryCard';
import { categoryGroups } from '../data/categories';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const CategoryList = () => {
  const [showMore, setShowMore] = useState(false);

  const mainCategories = categoryGroups[0].categories;
  const extendedCategories = categoryGroups[1].categories;

  return (
    <div className="bg-gray-50 dark:bg-gray-800 py-16 transition-colors">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Browse by Category
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Find the right service for your needs
          </p>
        </div>
        
        <div className="mx-auto mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 auto-rows-fr">
            {mainCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>

          {showMore && (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 auto-rows-fr">
              {extendedCategories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          )}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => setShowMore(!showMore)}
            className="inline-flex items-center px-6 py-3 text-base font-semibold text-[#ff5722] hover:text-[#f4511e] dark:text-[#ff5722] dark:hover:text-[#f4511e]"
          >
            {showMore ? (
              <>
                Show Less
                <ChevronUp className="ml-2 h-5 w-5" />
              </>
            ) : (
              <>
                Show More Categories
                <ChevronDown className="ml-2 h-5 w-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};