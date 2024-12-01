import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { providersAPI } from '../lib/providers';
import { Provider } from '../types/provider';
import { categoryGroups } from '../data/categories';
import { MetaHead } from '../components/MetaHead';
import { Heading } from '../components/ui/Heading';
import { Paragraph } from '../components/ui/Paragraph';
import { SearchBar } from '../components/SearchBar';
import ProviderCard from '../components/providers/ProviderCard';
import ProviderFilters from '../components/providers/ProviderFilters';

const Providers = () => {
  const { user } = useAuthContext();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedGender, setSelectedGender] = useState<string>('');
  const [providers, setProviders] = useState<Provider[]>([]);
  const [filteredProviders, setFilteredProviders] = useState<Provider[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const allCategories = [...categoryGroups[0].categories, ...categoryGroups[1].categories];

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const data = await providersAPI.getAll();
        setProviders(data);
        setFilteredProviders(data);
      } catch (error) {
        setError('Failed to load providers');
        console.error('Error fetching providers:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProviders();
  }, []);

  useEffect(() => {
    // Get category from URL params
    const params = new URLSearchParams(window.location.search);
    const categoryParam = params.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, []);

  useEffect(() => {
    let filtered = [...providers];

    if (selectedCategory) {
      filtered = filtered.filter(provider => provider.specialty === selectedCategory);
    }

    if (selectedLanguages.length > 0) {
      filtered = filtered.filter(provider => 
        selectedLanguages.every(lang => provider.spokenLanguages.includes(lang))
      );
    }

    if (selectedRegions.length > 0) {
      filtered = filtered.filter(provider => 
        selectedRegions.includes(provider.region)
      );
    }

    if (selectedGender) {
      filtered = filtered.filter(provider => provider.gender === selectedGender);
    }

    setFilteredProviders(filtered);
  }, [providers, selectedCategory, selectedLanguages, selectedRegions, selectedGender]);

  const resetFilters = () => {
    setSelectedCategory('');
    setSelectedLanguages([]);
    setSelectedRegions([]);
    setSelectedGender('');
    // Clear URL parameters
    window.history.replaceState({}, '', window.location.pathname);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <MetaHead 
        title="Find Service Providers - Hotovi"
        description="Browse through our extensive list of verified service providers. Find the perfect match for your needs based on skills, location, and reviews."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <Heading level={1} className="mb-4">Find Your Perfect Service Provider</Heading>
          <Paragraph className="max-w-2xl mx-auto">
            Find the perfect specialist for your needs
          </Paragraph>
          <div className="mt-8 flex justify-center">
            <SearchBar 
              placeholder="Search by service or category..."
              className="w-full max-w-2xl"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <ProviderFilters
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedLanguages={selectedLanguages}
            setSelectedLanguages={setSelectedLanguages}
            selectedRegions={selectedRegions}
            setSelectedRegions={setSelectedRegions}
            selectedGender={selectedGender}
            setSelectedGender={setSelectedGender}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            resetFilters={resetFilters}
            categories={allCategories}
          />

          <div className="flex-1">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#ff5722]"></div>
              </div>
            ) : filteredProviders.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">No providers in this category yet. Be the first to join and take the lead!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProviders.map((provider) => {
                  const category = allCategories.find(cat => cat.id === provider.specialty);
                  const Icon = category?.icon;

                  return (
                    <ProviderCard
                      key={provider.id}
                      provider={provider}
                      category={category}
                      Icon={Icon}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Providers;