// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "events-attendance-e2218.firebaseapp.com",
  projectId: "events-attendance-e2218",
  storageBucket: "events-attendance-e2218.appspot.com",
  messagingSenderId: "907723575897",
  appId: "1:907723575897:web:859466eee8c85f0c34d748",
  measurementId: "G-PF92KSL83T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
