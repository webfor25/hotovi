import React, { createContext, useContext, useState, useEffect } from 'react';
import { providersAPI } from '../lib/providers';
import { Provider } from '../types/provider';
import { categoryGroups } from '../data/categories';

type SearchContextType = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: Provider[];
  isSearching: boolean;
  selectedProvider: Provider | null;
  setSelectedProvider: (provider: Provider | null) => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [providers, setProviders] = useState<Provider[]>([]);
  const [searchResults, setSearchResults] = useState<Provider[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);

  // Fetch providers on mount
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const data = await providersAPI.getAll();
        setProviders(data);
      } catch (error) {
        console.error('Error fetching providers:', error);
      }
    };

    fetchProviders();
  }, []);

  // Filter providers based on search query
  useEffect(() => {
    const allCategories = [...categoryGroups[0].categories, ...categoryGroups[1].categories];
    
    const filterProviders = () => {
      const query = searchQuery.toLowerCase();
      if (!query) {
        setSearchResults([]);
        setIsSearching(false);
        return;
      }

      const filtered = providers.filter((provider) => {
        const category = allCategories.find(cat => cat.id === provider.specialty);
        return (
          provider.name.toLowerCase().includes(query) ||
          provider.region.toLowerCase().includes(query) ||
          category?.name.toLowerCase().includes(query) ||
          category?.description.toLowerCase().includes(query)
        );
      });

      setSearchResults(filtered);
      setIsSearching(true);
    };

    filterProviders();
  }, [searchQuery, providers]);

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        searchResults,
        isSearching,
        selectedProvider,
        setSelectedProvider,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};