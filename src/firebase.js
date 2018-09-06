import * as Firebase from 'firebase';
// const firebase = require('firebase');

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  storageBucket: process.env.STORAGE_BUCKET
};

Firebase.initializeApp(firebaseConfig);

export const firebase = Firebase;