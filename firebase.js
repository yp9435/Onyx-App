// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAST3qbIuP4GsfgAkAQywat8PD7ZzMccbg",
  authDomain: "onyx-app-319ef.firebaseapp.com",
  projectId: "onyx-app-319ef",
  storageBucket: "onyx-app-319ef.appspot.com",
  messagingSenderId: "606374351876",
  appId: "1:606374351876:web:0caaf92bbcb9cae308d151",
  measurementId: "G-NMEXF3N2Y9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export {firestore};
