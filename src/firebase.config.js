// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"; // Import getStorage
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC54Hz8PKYBaJnY_xKIsIUHIvbqGBGhnu8",
  authDomain: "woodsindica-2a9db.firebaseapp.com",
  projectId: "woodsindica-2a9db",
  storageBucket: "woodsindica-2a9db.appspot.com", // Include storageBucket
  messagingSenderId: "128387770060",
  appId: "1:128387770060:web:8ec20988b4987efab5c469",
  measurementId: "G-FEDNLV3PBD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app); // Export storage
export const db = getFirestore(app);
// const analytics = getAnalytics(app);

export default app;