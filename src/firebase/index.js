import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC_xGSKjaLpfRwKlFW2kfcI3LbG-nATsuA",
  authDomain: "familywallet-1682a.firebaseapp.com",
  projectId: "familywallet-1682a",
  storageBucket: "familywallet-1682a.appspot.com",
  messagingSenderId: "106714612349",
  appId: "1:106714612349:web:8e0fb4ee5a0b6152786714",
  measurementId: "G-XTT9XEEXQS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, app,db };