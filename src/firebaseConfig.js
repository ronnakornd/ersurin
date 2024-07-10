// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuQ2o4MWXGYdKS87-uGOynNNt5Go3hyfM",
  authDomain: "ersurin-d5908.firebaseapp.com",
  projectId: "ersurin-d5908",
  storageBucket: "ersurin-d5908.appspot.com",
  messagingSenderId: "712548555775",
  appId: "1:712548555775:web:72de67941235152109a5ca",
  measurementId: "G-78PY3RPPDK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { db };