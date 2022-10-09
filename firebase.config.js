// Import the functions you need from the SDKs you need
const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBF7MIAtW6BGwhegI9-sXkPlnh57gUmRsg',
  authDomain: 'house-marketplace-a0e4b.firebaseapp.com',
  projectId: 'house-marketplace-a0e4b',
  storageBucket: 'house-marketplace-a0e4b.appspot.com',
  messagingSenderId: '91125148402',
  appId: '1:91125148402:web:e2e1afb262111e07637e6b'
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
initializeApp(firebaseConfig);
const db = getFirestore();
module.exports.firebaseDB = db;
