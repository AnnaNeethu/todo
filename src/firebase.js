// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7CLdYCyeA2VUUS9o-_ue4x-labNjo-Eo",
  authDomain: "todo-71dda.firebaseapp.com",
  projectId: "todo-71dda",
  storageBucket: "todo-71dda.appspot.com",
  messagingSenderId: "36323770723",
  appId: "1:36323770723:web:38a9f40f0044424b235356"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
