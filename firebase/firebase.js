import { initializeApp } from "firebase/app";
import admin from "firebase-admin";
import dotenv from "dotenv";
dotenv.config();

var serviceAccount = JSON.parse(process.env.private_auth_admin_key);

export const adminAuth = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firebaseConfig = {
  apiKey: "AIzaSyAn7V7mWdYAw-HZwWcJ6_4rU_HE5Mr_euc",
  authDomain: "zachini-c2050.firebaseapp.com",
  projectId: "zachini-c2050",
  storageBucket: "zachini-c2050.appspot.com",
  messagingSenderId: "831034270962",
  appId: "1:831034270962:web:10c2d06ddaa69b9c469c6b",
  measurementId: "G-N13LSKQM2L",
};

export const firebaseApp = initializeApp(firebaseConfig);
