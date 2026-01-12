
import { getFirestore } from "firebase/firestore";
import * as firebaseApp from "firebase/app";

// --- INSTRUCTIONS ---
// 1. Go to Firebase Console > Project Settings > General > Your Apps
// 2. Copy the "firebaseConfig" object values
// 3. Paste them below replacing the placeholder text

const firebaseConfig = {
  apiKey: "PASTE_YOUR_API_KEY_HERE",
  authDomain: "PASTE_YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "PASTE_YOUR_PROJECT_ID",
  storageBucket: "PASTE_YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "PASTE_YOUR_SENDER_ID",
  appId: "PASTE_YOUR_APP_ID"
};

// Check if keys are still placeholders to avoid silent crashes
if (firebaseConfig.apiKey.includes("PASTE_YOUR")) {
  console.warn("Firebase API keys are missing! Database features will not work until you update frontend/firebaseConfig.ts.");
}

// Initialize Firebase connection
// Use type casting to bypass environment configuration mismatches
const app = (firebaseApp as any).initializeApp(firebaseConfig);

// Export the database reference
export const db = getFirestore(app);
