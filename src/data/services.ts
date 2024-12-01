import { Service } from '../types';
import { Briefcase, Home, Wrench, Heart } from 'lucide-react';

export const categoryIcons = {
  'finance': Briefcase,
  'home': Home,
  'repair': Wrench,
  'health': Heart
};

export const featuredServices: Service[] = [
  {
    id: '1',
    title: 'Tax Consultation',
    category: 'finance',
    description: 'Expert tax planning and consultation services for individuals and businesses.',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80'
  },
  {
    id: '2',
    title: 'Home Renovation',
    category: 'home',
    description: 'Complete home renovation and remodeling services for your dream space.',
    imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80'
  },
  {
    id: '3',
    title: 'Appliance Repair',
    category: 'repair',
    description: 'Professional repair services for all types of home appliances and equipment.',
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80'
  },
  {
    id: '4',
    title: 'Personal Training',
    category: 'health',
    description: 'Customized fitness programs and personal training sessions for your health goals.',
    imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80'
  }
];