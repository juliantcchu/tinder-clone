// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4KFlc-jQlOAl1f5Kn3HJsvntnQVy1GYo",
  authDomain: "tinder-clone-925f2.firebaseapp.com",
  projectId: "tinder-clone-925f2",
  storageBucket: "tinder-clone-925f2.appspot.com",
  messagingSenderId: "769985952565",
  appId: "1:769985952565:web:1cf947b4ac072e24c42a7c",
  measurementId: "G-67M6JD57R8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();

export {auth, db}