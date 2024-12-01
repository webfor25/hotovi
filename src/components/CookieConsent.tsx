import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const COOKIE_CONSENT_KEY = 'hotovi-cookie-consent';
const CONSENT_EXPIRY_DAYS = 14;
const CONSENT_DELAY_MS = 2500; // 2.5 seconds delay

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if consent was previously given
    const hasConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!hasConsent) {
      // Add delay before showing the consent banner
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, CONSENT_DELAY_MS);

      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    // Set consent with expiry date
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + CONSENT_EXPIRY_DAYS);
    localStorage.setItem(COOKIE_CONSENT_KEY, expiryDate.toISOString());
    
    // Hide the consent banner
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1 text-left">
            <p className="text-gray-600 dark:text-gray-300 text-[0.8rem]">
              We use cookies to make your visit extra sweet{' '}
              <a 
                href="/cookies-policy" 
                className="text-[#ff5722] hover:text-[#f4511e] underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Cookies Policy
              </a>
            </p>
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button
              onClick={acceptCookies}
              className="flex-1 sm:flex-none inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-[0.8rem] font-medium text-white bg-[#ff5722] hover:bg-[#f4511e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff5722] transition-colors"
            >
              Accept
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
              aria-label="Close cookie consent"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};