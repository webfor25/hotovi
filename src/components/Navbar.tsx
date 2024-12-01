import React, { useState } from 'react';
import { Menu, User, Settings } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSelector } from './LanguageSelector';
import { MobileMenu } from './MobileMenu';
import { UserMenu } from './UserMenu';
import { useAuthContext } from '../context/AuthContext';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isProviderPage = window.location.hash === '#become-provider';
  const { user } = useAuthContext();

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  const handleBecomeProvider = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.hash = 'become-provider';
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-sm transition-colors">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex h-12 items-center justify-between px-2 sm:px-0">
            {/* Logo Container - Moved to the left */}
            <div className="flex items-center pl-4 sm:pl-0">
              <a href="#" className="flex items-center">
                <img 
                  src="https://cdn.prod.website-files.com/629281ad74c406b3f5efe0f0/6747a5d0b86a28e21b098b44_Asset%201.svg" 
                  alt="Hotovi Logo" 
                  className="h-8 w-auto dark:invert transition-all"
                />
              </a>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden sm:flex sm:items-center sm:space-x-8">
              <a 
                href="#providers" 
                className={`text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white ${!isProviderPage && 'text-[#ff5722]'}`}
              >
                Find Services
              </a>
              <a 
                href="#become-provider"
                onClick={handleBecomeProvider}
                className={`text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white ${isProviderPage && 'text-[#ff5722]'}`}
              >
                Become a Provider
              </a>
              <LanguageSelector />
              <ThemeToggle />
              {user ? (
                <UserMenu />
              ) : (
                <a 
                  href="#signin"
                  className="inline-flex items-center justify-center rounded-md bg-[#ff5722] px-4 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-[#f4511e]"
                >
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </a>
              )}
            </div>
            
            {/* Mobile Controls - Language selector before hamburger menu */}
            <div className="sm:hidden flex items-center space-x-4">
              <LanguageSelector />
              <button 
                className="p-2.5 text-gray-600 dark:text-gray-300"
                onClick={handleMobileMenuToggle}
                aria-label="Toggle mobile menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <MobileMenu 
        isOpen={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
        isProviderPage={isProviderPage}
      />

      {/* Spacer to prevent content from being hidden under fixed navbar */}
      <div className="h-12"></div>
    </>
  );
};