import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

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

// Initialize Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const db = getFirestore(app);

export { auth, db };