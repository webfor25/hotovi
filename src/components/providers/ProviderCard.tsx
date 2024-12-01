import React from 'react';
import { Provider } from '../../types/provider';
import { Category } from '../../types';
import { availableLanguages } from '../../data/languages';
import { slovakRegions } from '../../data/regions';
import { ProviderContactOptions } from '../ProviderContactOptions';

interface ProviderCardProps {
  provider: Provider;
  category?: Category;
  Icon?: React.ElementType;
}

const ProviderCard: React.FC<ProviderCardProps> = ({ provider, category, Icon }) => {
  const firstLetter = provider?.name?.charAt(0) || '?';
  
  const languages = provider?.spokenLanguages?.map(lang => {
    const language = availableLanguages.find(l => l.code === lang);
    return language?.name;
  }).filter(Boolean) || [];

  const region = slovakRegions.find(r => r.id === provider?.region)?.name || provider?.region || 'Not specified';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
            {provider?.photoURL ? (
              <img 
                src={provider.photoURL} 
                alt={provider.name || 'Provider'} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500 text-xl font-semibold">
                {firstLetter}
              </div>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {provider?.name || 'Anonymous Provider'}
            </h3>
            {provider?.occupation && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {provider.occupation}
              </p>
            )}
            {category && Icon && (
              <div className="flex items-center text-[#ff5722]">
                <Icon className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">{category.name}</span>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium mr-2">Region:</span>
            <span>{region}</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {languages.map((lang, index) => (
              <span 
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#ff57221a] text-[#ff5722]"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>

        {provider?.email && provider?.phone && (
          <ProviderContactOptions 
            email={provider.email}
            phone={provider.phone}
          />
        )}
      </div>
    </div>
  );
};

export default ProviderCard;