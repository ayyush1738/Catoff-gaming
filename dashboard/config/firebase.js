// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, TwitterAuthProvider, signInWithPopup } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDM8MRWF0aCJj3GIZEc4RH8ZY0sCVTjAu4",
  authDomain: "catoff-da710.firebaseapp.com",
  projectId: "catoff-da710",
  storageBucket: "catoff-da710.firebasestorage.app",
  messagingSenderId: "545536756686",
  appId: "1:545536756686:web:1adec7b309cb536dc8b99f",
  measurementId: "G-49EK8NKQGC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new TwitterAuthProvider();

// Export the modules
export { auth, provider, signInWithPopup };
