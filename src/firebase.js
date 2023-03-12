// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAuXG5Vtn5Tv_7kJk3FuimpoWo6G8Q4wls',
  authDomain: 'ev-charging-solution2.firebaseapp.com',
  databaseURL: 'https://ev-charging-solution2-default-rtdb.firebaseio.com',
  projectId: 'ev-charging-solution2',
  storageBucket: 'ev-charging-solution2.appspot.com',
  messagingSenderId: '1095153079681',
  appId: '1:1095153079681:web:ff5b390a0d8d4451f40480'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
