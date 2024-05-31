// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage" 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrPu1Do2NujrjTMIfbv0OQURXw7_MVKbI",
  authDomain: "price-scraper-22e8c.firebaseapp.com",
  projectId: "price-scraper-22e8c",
  storageBucket: "price-scraper-22e8c.appspot.com",
  messagingSenderId: "467006196937",
  appId: "1:467006196937:web:5f384e0054ba9676a6d118",
  measurementId: "G-Z7FP4P4P07"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage = getStorage(app);