import { initializeApp } from "firebase/app";
import admin from "firebase-admin";
import dotenv from "dotenv";
dotenv.config();

var serviceAccount = JSON.parse(process.env.private_auth_admin_key);

export const adminAuth = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firebaseConfig = JSON.parse(process.env.firebase_config);

export const firebaseApp = initializeApp(firebaseConfig);
