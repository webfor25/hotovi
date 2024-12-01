import React from 'react';
import { Search, UserCheck, PhoneCall } from 'lucide-react';
import { Paragraph } from './ui/Paragraph';

export const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: 'Search for the Service You Need',
      description: 'Browse through our categories or use the search bar to find your required service'
    },
    {
      icon: UserCheck,
      title: 'Find the Right Provider',
      description: 'Choose a provider that matches your requirements and preferences'
    },
    {
      icon: PhoneCall,
      title: 'Contact the Provider',
      description: 'Reach out to the provider directly via phone or email'
    }
  ];

  return (
    <div id="how-it-works" className="bg-white dark:bg-gray-900 py-16 transition-colors">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Get Started in 3 Easy Steps
          </h2>
          <div className="mt-2">
            <Paragraph className="text-center">
              Your path to finding the perfect specialist
            </Paragraph>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.title} className="w-full h-full">
              <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-600 h-full flex flex-col items-center">
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  <div className="inline-flex p-4 bg-[#fff2ee] dark:bg-[#ff572233] rounded-2xl">
                    <step.icon className="h-8 w-8 text-[#ff5722]" />
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
                  {step.title}
                </h3>
                
                <Paragraph className="text-center">
                  {step.description}
                </Paragraph>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};