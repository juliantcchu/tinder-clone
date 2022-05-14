// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDddthWAagsgSIPQvbVUkfsPibK_BTd5Yc",
  authDomain: "foodie-b1cab.firebaseapp.com",
  projectId: "foodie-b1cab",
  storageBucket: "foodie-b1cab.appspot.com",
  messagingSenderId: "61638433560",
  appId: "1:61638433560:web:86de01f2a31e7cd2fc1c6d",
  measurementId: "G-HDX42Y9SHK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage(app);


export {auth, db, storage}