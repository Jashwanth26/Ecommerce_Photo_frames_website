// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCQKaz6VneAHwjuSqRQGxXLq3r2Q4DhLX8",
  authDomain: "react-4pm.firebaseapp.com",
  projectId: "react-4pm",
  storageBucket: "react-4pm.appspot.com",
  messagingSenderId: "1080913627248",
  appId: "1:1080913627248:web:d5726dc4ad8a4ca7284cb5",
  measurementId: "G-KSMPXZZP1L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
