import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { providersAPI } from '../src/lib/providers.js';

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
const db = getFirestore(app);

async function seedDatabase() {
  try {
    console.log('Starting database seeding...');
    await providersAPI.seedMockData();
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();