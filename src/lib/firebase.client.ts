// src/lib/firebase.client.ts
import {
  initializeApp,
  getApps,
  getApp,
  FirebaseApp,
} from "firebase/app";
import {
  getFirestore,
  Firestore,
} from "firebase/firestore";
import {
  getAuth,
  Auth,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

const app: FirebaseApp =
  getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Default Firestore export (what you already used)
export const db: Firestore = getFirestore(app);

// Helpers expected by /join/[code]/page.tsx
let authInstance: Auth | null = null;
export function getFirebaseAuth(): Auth {
  if (!authInstance) {
    authInstance = getAuth(app);
  }
  return authInstance;
}

let dbInstance: Firestore | null = null;
export function getFirebaseDb(): Firestore {
  if (!dbInstance) {
    dbInstance = getFirestore(app);
  }
  return dbInstance;
}
