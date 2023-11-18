// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLQmQp7H1dbZDWQMSphAzKkXANwDAUOBk",
  authDomain: "netflixgpt-b19bb.firebaseapp.com",
  projectId: "netflixgpt-b19bb",
  storageBucket: "netflixgpt-b19bb.appspot.com",
  messagingSenderId: "644554275991",
  appId: "1:644554275991:web:c3d99f298cd7e01580bdd2",
  measurementId: "G-2DFXD8X4SZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();