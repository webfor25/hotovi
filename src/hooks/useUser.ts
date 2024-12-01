import { useState, useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { usersAPI } from '../lib/users';
import { User } from '../types/user';

export const useUser = () => {
  const { user: authUser } = useAuthContext();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (!authUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        let userData = await usersAPI.get(authUser.uid);
        
        if (!userData) {
          // Create user document if it doesn't exist
          userData = await usersAPI.create(authUser.uid, {
            displayName: authUser.displayName || '',
            email: authUser.email || '',
            photoURL: authUser.photoURL || '',
            preferences: {
              notifications: true,
              language: 'en',
              theme: 'light'
            }
          });
        }

        setUser(userData as User);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [authUser]);

  const updateUser = async (data: Partial<User>) => {
    if (!authUser) return;

    try {
      const updatedData = await usersAPI.update(authUser.uid, data);
      setUser(prev => prev ? { ...prev, ...updatedData } : null);
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  };

  const updatePreferences = async (preferences: User['preferences']) => {
    if (!authUser) return;

    try {
      const updatedData = await usersAPI.updatePreferences(authUser.uid, preferences);
      setUser(prev => prev ? { ...prev, ...updatedData } : null);
    } catch (error) {
      console.error('Error updating preferences:', error);
      throw error;
    }
  };

  return {
    user,
    loading,
    updateUser,
    updatePreferences
  };
};