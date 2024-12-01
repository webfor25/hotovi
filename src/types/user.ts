export interface User {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  phoneNumber?: string;
  address?: {
    street?: string;
    city?: string;
    postalCode?: string;
    region?: string;
  };
  preferences?: {
    notifications: boolean;
    language: string;
    theme: 'light' | 'dark';
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface UserFormData {
  displayName: string;
  phoneNumber?: string;
  address?: {
    street?: string;
    city?: string;
    postalCode?: string;
    region?: string;
  };
  preferences?: {
    notifications: boolean;
    language: string;
    theme: 'light' | 'dark';
  };
}