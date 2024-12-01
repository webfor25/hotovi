import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface LightSwitchProps {
  className?: string;
  isDarkMode: boolean;
}

export const LightSwitch: React.FC<LightSwitchProps> = ({ className = '', isDarkMode }) => {
  return (
    <div className="flex items-center gap-2">
      <Sun className="w-4 h-4 text-gray-500 dark:text-gray-400" />
      <div className="relative w-12 h-6 bg-gray-200 dark:bg-gray-700 rounded-full transition-colors">
        <div
          className={`absolute top-1 left-1 w-4 h-4 bg-white dark:bg-gray-800 rounded-full shadow-md transform transition-transform duration-300 ${
            isDarkMode ? 'translate-x-6' : 'translate-x-0'
          }`}
        />
      </div>
      <Moon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
    </div>
  );
};