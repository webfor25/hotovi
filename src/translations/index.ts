import { en } from './en';

export const translations = {
  en
} as const;

export type Language = keyof typeof translations;