import React from 'react';
import { ProviderHero } from '../components/ProviderRegistration/ProviderHero';
import { RegistrationForm } from '../components/ProviderRegistration/RegistrationForm';
import { MetaHead } from '../components/MetaHead';

export const BecomeProvider = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <MetaHead 
        title="Become a Provider - 1HourHusband"
        description="Join our growing community of skilled professionals and connect with clients who need your services. Start earning on your own terms."
      />
      <ProviderHero />
      <RegistrationForm />
    </div>
  );
};