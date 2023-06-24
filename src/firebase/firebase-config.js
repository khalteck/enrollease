import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhZ1DFwBnlx6t-ySdYqWPp9pOmImhmsOU",
  authDomain: "enrollease-aa931.firebaseapp.com",
  projectId: "enrollease-aa931",
  storageBucket: "enrollease-aa931.appspot.com",
  messagingSenderId: "1062308434354",
  appId: "1:1062308434354:web:05fe54468f8d08eb5b14ab",
};

//to initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const auth = getAuth(app);
