import React, { useState, useRef } from 'react';
import { Camera, Save, Lock, Mail } from 'lucide-react';
import { Heading } from '../components/ui/Heading';
import { Paragraph } from '../components/ui/Paragraph';
import { useAuthContext } from '../context/AuthContext';
import { updateProfile } from '../lib/firebase';
import toast from 'react-hot-toast';
import { ProtectedRoute } from '../components/ProtectedRoute';

export const Profile = () => {
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showEmailChange, setShowEmailChange] = useState(false);

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsLoading(true);
      const url = await updateProfile.uploadPhoto(file);
      setPhotoURL(url);
      await updateProfile.updateUserPhoto(url);
      toast.success('Profile photo updated successfully');
    } catch (error) {
      toast.error('Failed to update profile photo');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      displayName: formData.get('displayName') as string,
      currentPassword: formData.get('currentPassword') as string,
      newPassword: formData.get('newPassword') as string,
      newEmail: formData.get('newEmail') as string,
      emailPassword: formData.get('emailPassword') as string,
    };

    try {
      if (data.currentPassword && data.newPassword) {
        await updateProfile.updatePassword(data.currentPassword, data.newPassword);
      }
      
      if (data.displayName !== user?.displayName) {
        await updateProfile.updateUserProfile({ displayName: data.displayName });
      }

      if (data.newEmail && data.emailPassword && data.newEmail !== user?.email) {
        await updateProfile.updateEmail(data.newEmail, data.emailPassword);
        toast.success('Email updated successfully. Please sign in again.');
        window.location.hash = 'signin';
        return;
      }

      toast.success('Profile updated successfully');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Failed to update profile');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Heading level={1} className="mb-8">Profile Settings</Heading>

            <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
              <div className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
                  <div className="relative">
                    <div 
                      className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden"
                      onClick={handlePhotoClick}
                    >
                      {photoURL ? (
                        <img 
                          src={photoURL} 
                          alt={user?.displayName || 'Profile'} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-4xl font-bold text-gray-400">
                          {user?.displayName?.charAt(0) || user?.email?.charAt(0)}
                        </span>
                      )}
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                        <Camera className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                  </div>

                  <div>
                    <Heading level={2} className="mb-2">
                      {user?.displayName || 'User'}
                    </Heading>
                    <Paragraph>{user?.email}</Paragraph>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Display Name
                    </label>
                    <input
                      type="text"
                      name="displayName"
                      id="displayName"
                      defaultValue={user?.displayName || ''}
                      className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 focus:border-[#ff5722] focus:outline-none focus:ring-[#ff5722] dark:bg-gray-700 sm:text-sm"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Email Address</h3>
                      <button
                        type="button"
                        onClick={() => setShowEmailChange(!showEmailChange)}
                        className="text-sm text-[#ff5722] hover:text-[#f4511e]"
                      >
                        {showEmailChange ? 'Cancel' : 'Change Email'}
                      </button>
                    </div>

                    {showEmailChange && (
                      <>
                        <div>
                          <label htmlFor="newEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            New Email Address
                          </label>
                          <div className="mt-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="email"
                              name="newEmail"
                              id="newEmail"
                              className="block w-full pl-10 rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 focus:border-[#ff5722] focus:outline-none focus:ring-[#ff5722] dark:bg-gray-700 sm:text-sm"
                              placeholder="Enter new email address"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="emailPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Current Password (required to change email)
                          </label>
                          <div className="mt-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="password"
                              name="emailPassword"
                              id="emailPassword"
                              className="block w-full pl-10 rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 focus:border-[#ff5722] focus:outline-none focus:ring-[#ff5722] dark:bg-gray-700 sm:text-sm"
                              placeholder="Enter your current password"
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Change Password</h3>
                    
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Current Password
                      </label>
                      <div className="mt-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="password"
                          name="currentPassword"
                          id="currentPassword"
                          className="block w-full pl-10 rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 focus:border-[#ff5722] focus:outline-none focus:ring-[#ff5722] dark:bg-gray-700 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        New Password
                      </label>
                      <div className="mt-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="password"
                          name="newPassword"
                          id="newPassword"
                          className="block w-full pl-10 rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 focus:border-[#ff5722] focus:outline-none focus:ring-[#ff5722] dark:bg-gray-700 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#ff5722] hover:bg-[#f4511e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff5722] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};