import React from 'react';
import { Filter } from 'lucide-react';
import { Category } from '../../types';
import { availableLanguages } from '../../data/languages';
import { slovakRegions } from '../../data/regions';

interface ProviderFiltersProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedLanguages: string[];
  setSelectedLanguages: (languages: string[]) => void;
  selectedRegions: string[];
  setSelectedRegions: (regions: string[]) => void;
  selectedGender: string;
  setSelectedGender: (gender: string) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  resetFilters: () => void;
  categories: Category[];
}

const ProviderFilters: React.FC<ProviderFiltersProps> = ({
  selectedCategory,
  setSelectedCategory,
  selectedLanguages,
  setSelectedLanguages,
  selectedRegions,
  setSelectedRegions,
  selectedGender,
  setSelectedGender,
  showFilters,
  setShowFilters,
  resetFilters,
  categories,
}) => {
  return (
    <div className="lg:w-64">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={resetFilters}
              className="text-sm text-[#ff5722] hover:text-[#f4511e] transition-colors"
            >
              Reset filters
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden bg-[#ff5722] hover:bg-[#f4511e] text-white p-2 rounded-lg transition-colors"
            >
              <Filter className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          {/* Category Filter */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Category</h3>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#ff5722]"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Languages Filter */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Languages</h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {availableLanguages.map((language) => (
                <label key={language.code} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedLanguages.includes(language.code)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedLanguages([...selectedLanguages, language.code]);
                      } else {
                        setSelectedLanguages(selectedLanguages.filter(l => l !== language.code));
                      }
                    }}
                    className="rounded border-gray-300 text-[#ff5722] focus:ring-[#ff5722]"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    {language.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Regions Filter */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Region</h3>
            <div className="space-y-2">
              {slovakRegions.map((region) => (
                <label key={region.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedRegions.includes(region.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedRegions([...selectedRegions, region.id]);
                      } else {
                        setSelectedRegions(selectedRegions.filter(r => r !== region.id));
                      }
                    }}
                    className="rounded border-gray-300 text-[#ff5722] focus:ring-[#ff5722]"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    {region.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Gender Filter */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Gender</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value=""
                  checked={selectedGender === ''}
                  onChange={(e) => setSelectedGender(e.target.value)}
                  className="rounded border-gray-300 text-[#ff5722] focus:ring-[#ff5722]"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">All</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={selectedGender === 'male'}
                  onChange={(e) => setSelectedGender(e.target.value)}
                  className="rounded border-gray-300 text-[#ff5722] focus:ring-[#ff5722]"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Male</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={selectedGender === 'female'}
                  onChange={(e) => setSelectedGender(e.target.value)}
                  className="rounded border-gray-300 text-[#ff5722] focus:ring-[#ff5722]"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Female</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderFilters;