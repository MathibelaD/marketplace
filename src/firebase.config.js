import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDmQ-hEldvdFB6amVtRRpSZWEcKxyjTf5U",
  authDomain: "market-place-38ccf.firebaseapp.com",
  projectId: "market-place-38ccf",
  storageBucket: "market-place-38ccf.appspot.com",
  messagingSenderId: "113086647854",
  appId: "1:113086647854:web:98d9b925ef35482c6299bf"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();

export { db };
