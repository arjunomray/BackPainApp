// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvhPA3nXbIU1U422YcUsZd0cHME9Y75-8",
  authDomain: "backpainapp-cecf1.firebaseapp.com",
  projectId: "backpainapp-cecf1",
  storageBucket: "backpainapp-cecf1.appspot.com",
  messagingSenderId: "148655413527",
  appId: "1:148655413527:web:8080c210322812a6347f52"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


// setPersistence(auth, browserLocalPersistence);

export { auth, db };