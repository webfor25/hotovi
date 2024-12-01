import React from 'react';
import { Search } from 'lucide-react';
import { useSearch } from '../context/SearchContext';
import { SearchResults } from './SearchResults';

interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder = "What service do you need?",
  className = "" 
}) => {
  const { searchQuery, setSearchQuery } = useSearch();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className={`relative w-full max-w-[500px] ${className}`}>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#ff5722] dark:placeholder-gray-400"
      />
      <button className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-[#ff5722] rounded-full text-white hover:bg-[#f4511e] flex items-center">
        <Search size={20} className="mr-0 md:mr-2" />
        <span className="hidden md:inline">Find Specialist</span>
      </button>
      <SearchResults />
    </div>
  );
};