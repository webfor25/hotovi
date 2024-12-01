import React from 'react';
import { FooterSection } from './FooterSection';
import { FooterLink } from './FooterLink';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Footer = () => {
  const { currentLanguage } = useLanguage();
  const currentYear = new Date().getFullYear();

  const scrollToHowItWorks = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const howItWorksSection = document.querySelector('#how-it-works');
    if (howItWorksSection) {
      howItWorksSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBecomeProvider = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.hash = 'become-provider';
  };

  const scrollToTestimonials = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const testimonialsSection = document.querySelector('#testimonials');
    if (testimonialsSection) {
      testimonialsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-50 dark:bg-gray-800 transition-colors">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="col-span-1">
            <div className="flex items-center mb-6">
              <img 
                src="https://cdn.prod.website-files.com/629281ad74c406b3f5efe0f0/6747a5d0b86a28e21b098b44_Asset%201.svg" 
                alt="Hotovi Logo" 
                className="h-8 w-auto dark:invert transition-all"
              />
              <span className="ml-2 text-base font-bold text-gray-900 dark:text-white">Hotovi</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Your trusted platform for finding skilled professionals for any job. Quality service, guaranteed satisfaction.
            </p>
            <div className="flex space-x-4">
              <FooterLink href="#">
                <Facebook className="h-5 w-5" />
              </FooterLink>
              <FooterLink href="#">
                <Twitter className="h-5 w-5" />
              </FooterLink>
              <FooterLink href="#">
                <Instagram className="h-5 w-5" />
              </FooterLink>
              <FooterLink href="#">
                <Linkedin className="h-5 w-5" />
              </FooterLink>
            </div>
          </div>

          {/* For Customers */}
          <div>
            <FooterSection title="For Customers">
              <ul className="space-y-3">
                <li><a href="#how-it-works" onClick={scrollToHowItWorks} className="text-base text-gray-600 dark:text-gray-400 hover:text-[#ff5722] dark:hover:text-[#ff5722] transition-colors">How It Works</a></li>
                <li><FooterLink href="#">Safety Measures</FooterLink></li>
                <li><FooterLink href="#">Pricing & Payment</FooterLink></li>
                <li><FooterLink href="#">Customer Reviews</FooterLink></li>
                <li><FooterLink href="#">FAQ</FooterLink></li>
              </ul>
            </FooterSection>
          </div>

          {/* For Professionals */}
          <div>
            <FooterSection title="For Professionals">
              <ul className="space-y-3">
                <li><a href="#become-provider" onClick={handleBecomeProvider} className="text-base text-gray-600 dark:text-gray-400 hover:text-[#ff5722] dark:hover:text-[#ff5722] transition-colors">Join as Professional</a></li>
                <li><a href="#testimonials" onClick={scrollToTestimonials} className="text-base text-gray-600 dark:text-gray-400 hover:text-[#ff5722] dark:hover:text-[#ff5722] transition-colors">Testimonials</a></li>
                <li><FooterLink href="#">Professional Resources</FooterLink></li>
                <li><FooterLink href="#">Community Guidelines</FooterLink></li>
                <li><FooterLink href="#">Partner Program</FooterLink></li>
              </ul>
            </FooterSection>
          </div>

          {/* Support */}
          <div>
            <FooterSection title="Support">
              <ul className="space-y-3">
                <li><FooterLink href="#">Contact Us</FooterLink></li>
                <li><FooterLink href="#">Privacy Policy</FooterLink></li>
                <li><FooterLink href="#">Terms of Service</FooterLink></li>
                <li><FooterLink href="#">Cookie Policy</FooterLink></li>
                <li><FooterLink href="#">Help Center</FooterLink></li>
              </ul>
            </FooterSection>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © {currentYear} Hotovi. All rights reserved.
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600 dark:text-gray-400 text-sm">
                Region: Slovakia
              </span>
              <span className="text-lg">🇸🇰</span>
            </div>
          </div>
        </div>

        {/* Subfooter */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center">
            <span className="text-gray-500 text-xs mr-2">Powered by</span>
            <a 
              href="https://web25.io" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center"
            >
              <img 
                src="https://cdn.prod.website-files.com/629281ad74c406b3f5efe0f0/629f0aaf68049d84a18c952b_logo.svg" 
                alt="Web25 Logo" 
                className="h-4 w-auto"
              />
              <span className="ml-1.5 text-[0.8rem] text-gray-600 dark:text-gray-400">Web25 s.r.o</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};