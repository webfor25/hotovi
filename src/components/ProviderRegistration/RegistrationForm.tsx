import React, { useState, useEffect } from 'react';
import { categoryGroups } from '../../data/categories';
import { slovakRegions } from '../../data/regions';
import { availableLanguages } from '../../data/languages';
import { useAuthContext } from '../../context/AuthContext';
import { providersAPI } from '../../lib/providers';
import { z } from 'zod';
import toast from 'react-hot-toast';

const providerFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\+421\d{9}$/, 'Phone number must be in format: +421XXXXXXXXX'),
  specialty: z.string().min(1, 'Please select a specialty'),
  region: z.string().min(1, 'Please select a region'),
  spokenLanguages: z.array(z.string()).min(1, 'Please select at least one language'),
  gender: z.enum(['male', 'female'], {
    required_error: 'Please select your gender',
  }),
  occupation: z.string().min(2, 'Occupation must be at least 2 characters'),
});

type ProviderFormData = z.infer<typeof providerFormSchema>;

export const RegistrationForm = () => {
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const allCategories = [...categoryGroups[0].categories, ...categoryGroups[1].categories];
  
  useEffect(() => {
    if (!user) {
      toast.error('Please sign in to register as a provider');
      window.location.hash = 'signin';
    }
  }, [user]);

  const [formData, setFormData] = useState<ProviderFormData>({
    name: user?.displayName || '',
    email: user?.email || '',
    phone: '',
    specialty: '',
    region: '',
    spokenLanguages: [],
    gender: 'male',
    occupation: '',
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.displayName || prev.name,
        email: user.email || prev.email,
      }));
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!user) {
        throw new Error('Please sign in to register as a provider');
      }

      const validatedData = providerFormSchema.parse(formData);
      await providersAPI.create(validatedData, user.uid);
      
      toast.success('Registration successful! We will review your application.');
      window.location.hash = '';
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
    setFormData(prev => ({ ...prev, spokenLanguages: selectedOptions }));
  };

  if (!user) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-900 py-16 transition-colors">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-gray-900 dark:text-white focus:border-[#ff5722] focus:ring-[#ff5722]"
            />
          </div>

          {/* Occupation */}
          <div>
            <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Occupation / Job Title
            </label>
            <input
              type="text"
              id="occupation"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-gray-900 dark:text-white focus:border-[#ff5722] focus:ring-[#ff5722]"
              placeholder="e.g. Senior Electrician, Professional Plumber"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-gray-900 dark:text-white focus:border-[#ff5722] focus:ring-[#ff5722]"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+421"
              required
              className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-gray-900 dark:text-white focus:border-[#ff5722] focus:ring-[#ff5722]"
            />
          </div>

          {/* Gender */}
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-gray-900 dark:text-white focus:border-[#ff5722] focus:ring-[#ff5722]"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Service Category */}
          <div>
            <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Service Category
            </label>
            <select
              id="specialty"
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-gray-900 dark:text-white focus:border-[#ff5722] focus:ring-[#ff5722]"
            >
              <option value="">Select a category</option>
              {allCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Region */}
          <div>
            <label htmlFor="region" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Region
            </label>
            <select
              id="region"
              name="region"
              value={formData.region}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-gray-900 dark:text-white focus:border-[#ff5722] focus:ring-[#ff5722]"
            >
              <option value="">Select a region</option>
              {slovakRegions.map((region) => (
                <option key={region.id} value={region.id}>
                  {region.name}
                </option>
              ))}
            </select>
          </div>

          {/* Spoken Languages */}
          <div>
            <label htmlFor="spokenLanguages" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Spoken Languages
            </label>
            <select
              id="spokenLanguages"
              name="spokenLanguages"
              value={formData.spokenLanguages}
              onChange={handleLanguageChange}
              required
              multiple
              className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-gray-900 dark:text-white focus:border-[#ff5722] focus:ring-[#ff5722]"
              size={5}
            >
              {availableLanguages.map((language) => (
                <option key={language.code} value={language.code}>
                  {language.name}
                </option>
              ))}
            </select>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Hold Ctrl (Windows) or Command (Mac) to select multiple languages
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-[#ff5722] px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-[#f4511e] focus:outline-none focus:ring-2 focus:ring-[#ff5722] focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Submitting...' : 'Join Waiting List'}
          </button>
        </form>
      </div>
    </div>
  );
};