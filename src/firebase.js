import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider, 
  signInWithPopup, 
} from "firebase/auth";
import { getDatabase, ref, set, get, push, remove ,update, onValue} from "firebase/database";

// تكوين Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDFFO5mpXml-jE3i6qcEXd3VSAFmMSkUMo",
  authDomain: "reactprojectteam.firebaseapp.com",
  databaseURL: "https://reactprojectteam-default-rtdb.firebaseio.com",
  projectId: "reactprojectteam",
  storageBucket: "reactprojectteam.firebasestorage.app",
  messagingSenderId: "84862365122",
  appId: "1:84862365122:web:7b81895080bd88a19dfa5b",
  measurementId: "G-K7QKHY9TL7",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,  
  signInWithPopup, 
  database,
  ref,
  set,
  get,
  push,
  remove,
  update
  ,getAuth 
  ,onValue
};
