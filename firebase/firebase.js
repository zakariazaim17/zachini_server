import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAn7V7mWdYAw-HZwWcJ6_4rU_HE5Mr_euc",
  authDomain: "zachini-c2050.firebaseapp.com",
  projectId: "zachini-c2050",
  storageBucket: "zachini-c2050.appspot.com",
  messagingSenderId: "831034270962",
  appId: "1:831034270962:web:10c2d06ddaa69b9c469c6b",
  measurementId: "G-N13LSKQM2L",
};

const firebaseApp = initializeApp(firebaseConfig);
//console.log(firebaseApp);

//const storage = getStorage(firebaseApp);

export default firebaseApp;
