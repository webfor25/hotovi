import React from 'react';
import { ArrowRight, Target, Clock, Wallet, Star } from 'lucide-react';
import { Paragraph } from './ui/Paragraph';

export const BecomeProviderSection = () => {
  const benefits = [
    {
      icon: Target,
      title: 'Choose Your Projects',
      description: 'Work on jobs that match your skills and interests'
    },
    {
      icon: Clock,
      title: 'Flexible Schedule',
      description: 'Set your own hours and work when it suits you'
    },
    {
      icon: Wallet,
      title: 'Competitive Earnings',
      description: 'Set your own rates and earn what you deserve'
    },
    {
      icon: Star,
      title: 'Build Your Reputation',
      description: 'Grow your business through client reviews'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-[#fff8f6] to-[#fff2ee] dark:from-gray-800/50 dark:to-gray-800/30 py-24 transition-colors relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute w-[500px] h-[500px] -right-24 -top-24 bg-[#ff5722] rounded-full mix-blend-multiply dark:mix-blend-soft-light opacity-[0.15] blur-3xl animate-pulse" />
        <div className="absolute w-[500px] h-[500px] -left-24 -bottom-24 bg-[#ff5722] rounded-full mix-blend-multiply dark:mix-blend-soft-light opacity-[0.15] blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <span className="inline-flex items-center rounded-full px-4 py-1 text-sm font-medium bg-[#ff57221a] text-[#ff5722] ring-1 ring-inset ring-[#ff572233] mb-4">
            Become a Provider
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-4">
            Share Your Expertise
          </h2>
          <Paragraph className="text-lg">
            Join our growing community of skilled professionals and connect with clients who need your services. Start earning on your own terms.
          </Paragraph>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#ff57221a] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#ff57221a] text-[#ff5722] mb-4 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {benefit.title}
                </h3>
                <Paragraph className="text-sm">
                  {benefit.description}
                </Paragraph>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="#become-provider"
            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-[#ff5722] rounded-xl hover:bg-[#f4511e] transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl group"
          >
            Join our waiting list
            <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
};