import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: "eshop1-698e1.firebaseapp.com",
  projectId: "eshop1-698e1",
  storageBucket: "eshop1-698e1.appspot.com",
  messagingSenderId: "501514095585",
  appId: "1:501514095585:web:142d43c407860f505fa0a0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
