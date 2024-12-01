import React, { useEffect } from 'react';
import { User, X, Settings } from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';
import { ThemeToggle } from './ThemeToggle';
import { useAuthContext } from '../context/AuthContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isProviderPage: boolean;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, isProviderPage }) => {
  const { user } = useAuthContext();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  const handleBecomeProvider = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.hash = 'become-provider';
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-[60] bg-white dark:bg-gray-900 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
      role="dialog"
      aria-modal="true"
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center px-10 py-4 border-b border-gray-200 dark:border-gray-700">
          <a href="#" onClick={() => onClose()}>
            <img 
              src="https://cdn.prod.website-files.com/629281ad74c406b3f5efe0f0/6747a5d0b86a28e21b098b44_Asset%201.svg" 
              alt="Hotovi Logo" 
              className="h-10 w-auto dark:invert transition-all"
            />
          </a>
          <button 
            onClick={onClose}
            className="p-2 ml-10 text-gray-600 dark:text-gray-300"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-10 py-6">
          <nav className="flex flex-col space-y-6">
            <a 
              href="#providers" 
              onClick={onClose}
              className={`text-lg ${!isProviderPage ? 'text-[#ff5722]' : 'text-gray-600 dark:text-gray-300'}`}
            >
              Find Services
            </a>
            <a 
              href="#become-provider" 
              onClick={handleBecomeProvider}
              className={`text-lg ${isProviderPage ? 'text-[#ff5722]' : 'text-gray-600 dark:text-gray-300'}`}
            >
              Become a Provider
            </a>
          </nav>

          <div className="mt-8 space-y-6">
            <div className="flex items-center justify-between">
              <ThemeToggle />
            </div>
            {user ? (
              <a
                href="#profile"
                onClick={onClose}
                className="w-full inline-flex items-center justify-center rounded-md bg-[#ff5722] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#f4511e]"
              >
                <Settings className="h-4 w-4 mr-2" />
                Profile Settings
              </a>
            ) : (
              <>
                <a 
                  href="#signin"
                  onClick={onClose}
                  className="w-full inline-flex items-center justify-center rounded-md bg-[#ff5722] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#f4511e]"
                >
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </a>
                <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                  Don't have an account? {' '}
                  <a 
                    href="#signup" 
                    onClick={onClose}
                    className="text-[#ff5722] hover:text-[#f4511e]"
                  >
                    Sign up here
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};