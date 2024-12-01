import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { LightSwitch } from './icons/LightSwitch';

export const ThemeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 hover:opacity-90 transition-opacity rounded-lg"
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      <LightSwitch isDarkMode={isDarkMode} />
    </button>
  );
};