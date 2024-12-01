import React from 'react';

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

export const FooterLink: React.FC<FooterLinkProps> = ({ href, children }) => {
  return (
    <a
      href={href}
      className="text-base text-gray-600 dark:text-gray-400 hover:text-[#ff5722] dark:hover:text-[#ff5722] transition-colors"
    >
      {children}
    </a>
  );
};