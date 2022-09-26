// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkV4uESU3y5zlM6YuA4UZ8QgqWDtMkHw4",
  authDomain: "ev-charging-solution.firebaseapp.com",
  projectId: "ev-charging-solution",
  storageBucket: "ev-charging-solution.appspot.com",
  messagingSenderId: "354763656296",
  appId: "1:354763656296:web:0ef45c1d92c85f1505bfdd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);