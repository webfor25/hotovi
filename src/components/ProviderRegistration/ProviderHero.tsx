import React from 'react';
import { Briefcase, CheckCircle } from 'lucide-react';

export const ProviderHero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 text-white min-h-[80vh]">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/20 z-10" /> {/* Overlay */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover grayscale"
          style={{ filter: 'brightness(0.8)' }}
        >
          <source
            src="https://cdn.coverr.co/videos/coverr-a-business-meeting-in-an-office-5244/1080p.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-6">
              <Briefcase className="h-5 w-5 text-[#ff5722]" />
              <span className="text-lg font-medium">Become a Provider</span>
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6 text-white">
              Turn Your Skills Into Success
            </h1>
            
            <p className="text-xl text-gray-200 mb-8 max-w-xl">
              Join our community of skilled professionals and connect with clients looking for your expertise.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                'Access to a large client base',
                'Flexible schedule',
                'Set your own rates',
                'Secure payments'
              ].map((benefit, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-3 p-4 rounded-lg bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors"
                >
                  <CheckCircle className="h-5 w-5 text-[#ff5722]" />
                  <span className="text-gray-200">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block relative">
            <div className="absolute -inset-4 bg-[#ff5722] opacity-10 blur-3xl rounded-full" />
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80"
              alt="Professional at work"
              className="relative rounded-2xl shadow-2xl transform hover:scale-[1.02] transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};