import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  updatePassword, 
  EmailAuthProvider, 
  reauthenticateWithCredential,
  updateEmail,
  sendEmailVerification
} from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, enableIndexedDbPersistence } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBQSbCvB24ATl0w1_aGKq_lYwb6ujourPA",
  authDomain: "hotovi.firebaseapp.com",
  projectId: "hotovi",
  storageBucket: "hotovi.firebasestorage.app",
  messagingSenderId: "185708315370",
  appId: "1:185708315370:web:8715b52f8ec8ebc1be4d93",
  measurementId: "G-FMFG7HHWFR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);

// Initialize Firestore
export const db = getFirestore(app);

// Enable offline persistence
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
  } else if (err.code === 'unimplemented') {
    console.warn('The current browser does not support persistence.');
  }
});

export const updateProfile = {
  async uploadPhoto(file: File) {
    const user = auth.currentUser;
    if (!user) throw new Error('No user logged in');

    const storageRef = ref(storage, `profile-photos/${user.uid}/${Date.now()}-${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    return getDownloadURL(snapshot.ref);
  },

  async updateUserPhoto(photoURL: string) {
    const user = auth.currentUser;
    if (!user) throw new Error('No user logged in');
    
    await user.updateProfile({ photoURL });
  },

  async updateUserProfile(profile: { displayName?: string; photoURL?: string }) {
    const user = auth.currentUser;
    if (!user) throw new Error('No user logged in');
    
    await user.updateProfile(profile);
  },

  async updatePassword(currentPassword: string, newPassword: string) {
    const user = auth.currentUser;
    if (!user) throw new Error('No user logged in');
    if (!user.email) throw new Error('No email associated with user');

    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);
  },

  async updateEmail(newEmail: string, password: string) {
    const user = auth.currentUser;
    if (!user) throw new Error('No user logged in');
    if (!user.email) throw new Error('No email associated with user');

    const credential = EmailAuthProvider.credential(user.email, password);
    await reauthenticateWithCredential(user, credential);
    await updateEmail(user, newEmail);
  }
};