import { getFirestore } from "firebase/firestore";
import * as firebaseApp from "firebase/app";

// --- INSTRUCTIONS ---
// 1. Go to Firebase Console > Project Settings > General > Your Apps
// 2. Copy the "firebaseConfig" object values
// 3. Paste them below replacing the "PASTE_HERE" text

const firebaseConfig = {
  // Example format: apiKey: "AIzaSyDOCAbC...",
  apiKey: "PASTE_YOUR_API_KEY_HERE",
  authDomain: "PASTE_YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "PASTE_YOUR_PROJECT_ID",
  storageBucket: "PASTE_YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "PASTE_YOUR_SENDER_ID",
  appId: "PASTE_YOUR_APP_ID"
};

// Initialize Firebase connection
// Use type casting to bypass "Module 'firebase/app' has no exported member 'initializeApp'" error
// which can occur due to type definition mismatches or environment configuration.
const app = (firebaseApp as any).initializeApp(firebaseConfig);

// Export the database reference to be used in other files
export const db = getFirestore(app);