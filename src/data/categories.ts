import {
  Briefcase, Home, Scissors, UtensilsCrossed, Heart, Wrench,
  GraduationCap, Users, PartyPopper, Camera, Gift, Dog,
  Sparkles, Car, Zap, Droplets, Tv, Truck, Stethoscope, Trash2, Calculator, Scale,
  Thermometer
} from 'lucide-react';
import { CategoryGroup } from '../types';

export const categoryGroups: CategoryGroup[] = [
  {
    id: 'main',
    categories: [
      {
        id: 'electrical',
        name: 'Electrical Works',
        icon: Zap,
        description: 'Professional electrical installation and repairs'
      },
      {
        id: 'plumbing',
        name: 'Plumber',
        icon: Droplets,
        description: 'Expert plumbing services and maintenance'
      },
      {
        id: 'air-condition',
        name: 'Air Condition Specialist',
        icon: Thermometer,
        description: 'Professional air conditioning installation and maintenance'
      },
      {
        id: 'home',
        name: 'Home',
        icon: Home,
        description: 'Home improvement and maintenance'
      },
      {
        id: 'repair',
        name: 'Repair & Restoration',
        icon: Wrench,
        description: 'Professional repair and restoration services'
      },
      {
        id: 'moving',
        name: 'Moving & Transport',
        icon: Truck,
        description: 'Professional moving and transportation services'
      },
      {
        id: 'beauty',
        name: 'Beauty',
        icon: Scissors,
        description: 'Beauty and personal care services'
      },
      {
        id: 'hairdresser',
        name: 'Hair Dresser',
        icon: Scissors,
        description: 'Professional hair styling and cutting services'
      },
      {
        id: 'health',
        name: 'Health Insurance, Sport',
        icon: Heart,
        description: 'Health insurance and sports services'
      },
      {
        id: 'body-therapist',
        name: 'Body Therapist',
        icon: Stethoscope,
        description: 'Professional massage and body therapy services'
      },
      {
        id: 'internet-tv',
        name: 'Internet & TV',
        icon: Tv,
        description: 'Internet setup and TV installation services'
      },
      {
        id: 'accountant',
        name: 'Accountant & Finance',
        icon: Calculator,
        description: 'Professional accounting and financial services'
      },
      {
        id: 'legal',
        name: 'Legal Services, Lawyer',
        icon: Scale,
        description: 'Professional legal advice and services'
      }
    ]
  },
  {
    id: 'extended',
    categories: [
      {
        id: 'childcare',
        name: 'Childcare',
        icon: Users,
        description: 'Childcare and babysitting services'
      },
      {
        id: 'education',
        name: 'Education',
        icon: GraduationCap,
        description: 'Educational and tutoring services'
      },
      {
        id: 'food',
        name: 'Food',
        icon: UtensilsCrossed,
        description: 'Food and catering services'
      },
      {
        id: 'events',
        name: 'Events, Activities',
        icon: PartyPopper,
        description: 'Event planning and activities'
      },
      {
        id: 'media',
        name: 'Photo, Video, Artist',
        icon: Camera,
        description: 'Creative media services'
      },
      {
        id: 'gifts',
        name: 'Gifts, Flowers',
        icon: Gift,
        description: 'Gift and flower delivery services'
      },
      {
        id: 'animals',
        name: 'Animals',
        icon: Dog,
        description: 'Pet care and animal services'
      },
      {
        id: 'esoterics',
        name: 'Esoterics',
        icon: Sparkles,
        description: 'Esoteric and spiritual services'
      },
      {
        id: 'cleaning',
        name: 'Cleaning Services',
        icon: Trash2,
        description: 'Professional cleaning and maintenance services'
      },
      {
        id: 'auto',
        name: 'Auto Service',
        icon: Car,
        description: 'Automotive repair and maintenance'
      }
    ]
  }
];