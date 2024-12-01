import { Provider } from '../types/provider';
import { slovakRegions } from './regions';
import { categoryGroups } from './categories';

const allCategories = [...categoryGroups[0].categories, ...categoryGroups[1].categories];

export const mockProviders: Omit<Provider, 'id' | 'createdAt' | 'updatedAt'>[] = [
  // Electrical Services
  {
    uid: 'mock-1',
    name: 'Miroslav Kovač',
    email: 'miroslav.kovac@example.com',
    phone: '+421901234567',
    photoURL: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400',
    specialty: 'electrical',
    region: slovakRegions[0].name,
    spokenLanguages: ['sk', 'en', 'cs'],
    gender: 'male'
  },
  {
    uid: 'mock-2',
    name: 'Stanislav Novotný',
    email: 'stanislav.novotny@example.com',
    phone: '+421902234567',
    photoURL: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400',
    specialty: 'electrical',
    region: slovakRegions[1].name,
    spokenLanguages: ['sk', 'cs'],
    gender: 'male'
  },
  // ... continue updating other mock providers
];