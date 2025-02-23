// firebase.config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"; 


const firebaseConfig = {
  apiKey: "AIzaSyDmi4y8hMTolQAPyv-JOh8KgvioHKsXV6Q",
  authDomain: "cardsection21.firebaseapp.com",
  projectId: "cardsection21",
  storageBucket: "cardsection21.firebasestorage.app",
  messagingSenderId: "395426293130",
  appId: "1:395426293130:web:b809d65bb73b9bca0d1473"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Firebase Authentication
export const database = getDatabase(app); // Firebase Realtime Database
