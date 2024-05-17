import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyAWQir2FTAlRQ8FT8kKLIftXXuewZqIhXc",
  authDomain: "eshopweb-de106.firebaseapp.com",
  projectId: "eshopweb-de106",
  storageBucket: "eshopweb-de106.appspot.com",
  messagingSenderId: "156799045586",
  appId: "1:156799045586:web:675d63aa4b355caa1d820b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
