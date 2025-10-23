import admin from "firebase-admin";

const saJson = process.env.FIREBASE_SERVICE_ACCOUNT;
if (!saJson) {
  throw new Error("Missing FIREBASE_SERVICE_ACCOUNT env var");
}

const serviceAccount = JSON.parse(saJson);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const db = admin.firestore();
