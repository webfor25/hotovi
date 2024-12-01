import React from 'react';
import { Service } from '../types';
import { categoryIcons } from '../data/services';
import { Paragraph } from './ui/Paragraph';

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const Icon = categoryIcons[service.category];

  return (
    <div className="group flex flex-col bg-white dark:bg-gray-700 rounded-2xl shadow-sm transition-all hover:shadow-md overflow-hidden">
      <div className="aspect-[3/2] overflow-hidden">
        <img
          src={service.imageUrl}
          alt={service.title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center justify-center p-2 bg-[#fff2ee] dark:bg-[#ff572233] rounded-lg">
            <Icon className="h-5 w-5 text-[#ff5722]" />
          </span>
          <span className="text-sm font-medium text-[#ff5722]">
            {service.category.split('-').map(word => 
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ')}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {service.title}
        </h3>
        <Paragraph>{service.description}</Paragraph>
      </div>
    </div>
  );
};