export interface Provider {
  id: string;
  uid: string;
  name: string;
  email: string;
  phone: string;
  photoURL: string;
  specialty: string;
  region: string;
  spokenLanguages: string[];
  gender: 'male' | 'female' | 'other';
  occupation: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProviderFormData {
  name: string;
  email: string;
  phone: string;
  specialty: string;
  region: string;
  spokenLanguages: string[];
  gender: 'male' | 'female' | 'other';
  occupation: string;
}