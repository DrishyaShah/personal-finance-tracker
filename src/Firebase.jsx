// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore, doc, setDoc, getDoc} from "firebase/firestore"
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHgbriBt8BLHevhraaq6tlO3t8Uj3xBRI",
  authDomain: "personal-finance-tracker-2bbed.firebaseapp.com",
  projectId: "personal-finance-tracker-2bbed",
  storageBucket: "personal-finance-tracker-2bbed.appspot.com",
  messagingSenderId: "746056456762",
  appId: "1:746056456762:web:a8bbaf812bf75d7433f303",
  measurementId: "G-RSVMSGM4P9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {db, auth, provider, doc, setDoc, getDoc}