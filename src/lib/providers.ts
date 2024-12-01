import { collection, addDoc, getDocs, query, where, orderBy, Timestamp, writeBatch, doc } from 'firebase/firestore';
import { db } from './firebase';
import { Provider, ProviderFormData } from '../types/provider';
import { mockProviders } from '../data/mockProviders';

const PROVIDERS_COLLECTION = 'providers';

export const providersAPI = {
  async create(data: ProviderFormData, uid: string) {
    const providerData = {
      ...data,
      uid,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    const docRef = await addDoc(collection(db, PROVIDERS_COLLECTION), providerData);
    return docRef.id;
  },

  async getAll() {
    const querySnapshot = await getDocs(
      query(collection(db, PROVIDERS_COLLECTION), orderBy('createdAt', 'desc'))
    );
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Provider[];
  },

  async getBySpecialty(specialty: string) {
    const querySnapshot = await getDocs(
      query(
        collection(db, PROVIDERS_COLLECTION),
        where('specialty', '==', specialty),
        orderBy('createdAt', 'desc')
      )
    );
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Provider[];
  },

  async seedMockData() {
    const batch = writeBatch(db);
    
    // First, clear existing data
    const existingDocs = await getDocs(collection(db, PROVIDERS_COLLECTION));
    existingDocs.forEach(doc => {
      batch.delete(doc.ref);
    });

    // Add mock providers
    mockProviders.forEach(provider => {
      const docRef = doc(collection(db, PROVIDERS_COLLECTION));
      batch.set(docRef, {
        ...provider,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
    });

    await batch.commit();
  }
};