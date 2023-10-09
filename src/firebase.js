// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmn2SRlfHlytVzS5jpBcP9YUgL1IUkERk",
  authDomain: "dashwords-7940c.firebaseapp.com",
  projectId: "dashwords-7940c",
  storageBucket: "dashwords-7940c.appspot.com",
  messagingSenderId: "195100011640",
  appId: "1:195100011640:web:d0575aaade439047ed918d",
  measurementId: "G-2Y2FHQV2GK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics }; // Export the initialized app and analytics instance
