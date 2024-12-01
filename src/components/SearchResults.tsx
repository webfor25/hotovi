import React from 'react';
import { useSearch } from '../context/SearchContext';
import { categoryGroups } from '../data/categories';

export const SearchResults = () => {
  const { searchQuery, isSearching, setSearchQuery } = useSearch();
  const allCategories = [...categoryGroups[0].categories, ...categoryGroups[1].categories];

  if (!isSearching) return null;

  // Filter categories based on search query
  const filteredCategories = allCategories.filter(category => 
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCategoryClick = (categoryId: string) => {
    // Clear the search query
    setSearchQuery('');
    
    // Navigate to providers page with category filter
    window.location.hash = 'providers';
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('category', categoryId);
    window.location.search = searchParams.toString();
  };

  return (
    <div className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50 max-h-[70vh] overflow-y-auto">
      <div className="p-4">
        {filteredCategories.length > 0 ? (
          <>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
              Available Services
            </h3>
            <div className="space-y-2">
              {filteredCategories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                >
                  <div className="flex-shrink-0 mt-1">
                    <category.icon className="h-5 w-5 text-[#ff5722]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base font-medium text-gray-900 dark:text-white text-left">
                      {category.name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-left">
                      {category.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="py-8">
            <p className="text-gray-600 dark:text-gray-300 text-left">
              No services found for "{searchQuery}". Try a different search term.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};