import { doc, setDoc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from './firebase';
import { User, UserFormData } from '../types/user';

const USERS_COLLECTION = 'users';

export const usersAPI = {
  async create(uid: string, data: Partial<UserFormData>) {
    const userData: Partial<User> = {
      uid,
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    await setDoc(doc(db, USERS_COLLECTION, uid), userData);
    return userData;
  },

  async get(uid: string) {
    const docRef = doc(db, USERS_COLLECTION, uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as User;
    }
    
    return null;
  },

  async update(uid: string, data: Partial<UserFormData>) {
    const docRef = doc(db, USERS_COLLECTION, uid);
    const updateData = {
      ...data,
      updatedAt: Timestamp.now(),
    };

    await updateDoc(docRef, updateData);
    return updateData;
  },

  async updatePreferences(uid: string, preferences: User['preferences']) {
    const docRef = doc(db, USERS_COLLECTION, uid);
    const updateData = {
      preferences,
      updatedAt: Timestamp.now(),
    };

    await updateDoc(docRef, updateData);
    return updateData;
  }
};