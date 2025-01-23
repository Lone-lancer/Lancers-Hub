const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  getDoc,
  deleteDoc,
  updateDoc,
  addDoc,
} = require("firebase/firestore");
const { getStorage } = require("firebase/storage");

require("dotenv").config();

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.office,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Export required Firestore methods
module.exports = {
  app,
  db,
  storage,
  doc,
  setDoc,
  collection,
  query,
  where,
  getDoc,
  deleteDoc,
  updateDoc,
  addDoc,
  getDocs,
};
