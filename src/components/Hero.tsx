import React from 'react';
import { useSearch } from '../context/SearchContext';
import { SearchBar } from './SearchBar';
import { Paragraph } from './ui/Paragraph';
import { TypewriterText } from './ui/TypewriterText';
import { categoryGroups } from '../data/categories';
import { Heart } from 'lucide-react';

export const Hero = () => {
  const allCategories = [...categoryGroups[0].categories, ...categoryGroups[1].categories];
  const serviceTypes = allCategories.map(category => category.name);

  return (
    <div className="relative bg-black h-auto md:h-screen">
      {/* Background with gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#0e1117]">
          {/* Animated gradient orbs */}
          <div className="absolute w-[200px] h-[200px] top-[-20%] right-[-20%] rounded-full bg-[#61DAFB] opacity-30 blur-[80px] animate-pulse"></div>
          <div className="absolute w-[200px] h-[200px] bottom-[-20%] left-[-20%] rounded-full bg-[#61DAFB] opacity-30 blur-[80px] animate-pulse delay-700"></div>
          <div className="absolute w-[150px] h-[150px] top-[40%] left-[20%] rounded-full bg-[#61DAFB] opacity-20 blur-[80px] animate-pulse delay-300"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 mx-auto max-w-7xl px-6 py-8 md:py-24 lg:px-8 h-full flex items-center">
        <div className="text-center w-full">
          <div className="py-6">
            {/* Beta Tag */}
            <div className="flex flex-col md:flex-row justify-center items-center mb-8 space-y-2 md:space-y-0 md:space-x-4">
              <span className="px-4 py-1 bg-[#ff57221a] text-[#ff5722] rounded-full text-[0.8rem] md:text-sm font-medium border border-[#ff572233]">
                Beta version
              </span>
              <span className="px-4 py-1 bg-[#ff57221a] text-[#ff5722] rounded-full text-[0.8rem] md:text-sm font-medium border border-[#ff572233] flex items-center">
                Made with <Heart className="w-4 h-4 mx-1 fill-[#ff5722]" /> for Foreigners in Bratislava
              </span>
            </div>
            
            <div className="py-6">
              <h1 className="text-[1.3rem] md:text-[3rem] font-bold tracking-tight text-white leading-[0.99] mb-4">
                Find the Perfect Professional for
              </h1>
              <div className="h-[1.3rem] md:h-[3rem] text-[1.3rem] md:text-[3rem] font-bold tracking-tight leading-[0.99] text-[#ff5722]">
                <TypewriterText words={serviceTypes} typingSpeed={100} deletingSpeed={50} pauseTime={2000} />
              </div>
            </div>
            <div className="mt-2">
              <Paragraph className="text-[1.5rem] md:text-[1.2rem] text-white opacity-75">
                Your one-stop marketplace for skilled experts - from home maintenance to creative services
              </Paragraph>
            </div>
          </div>
          <div className="mt-10 flex flex-col items-center space-y-6">
            <SearchBar />
            <div className="text-white">
              <span className="mr-2">Become provider -</span>
              <a 
                href="#become-provider" 
                className="text-[#ff5722] hover:text-[#f4511e] transition-colors underline"
              >
                Join our waiting list
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};