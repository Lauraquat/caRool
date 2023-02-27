import 'firebase/app';
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import 'firebase/firestore';
import { getFirestore } from 'firebase/firestore/lite';
    
const firebaseConfig = {
    apiKey: "AIzaSyBIdRGfe7wDOSJlK9572Txqra4vNlNgNMo",
    authDomain: "ca-rool-52ff4.firebaseapp.com",
    databaseURL: "https://ca-rool-52ff4-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "ca-rool-52ff4",
    storageBucket: "ca-rool-52ff4.appspot.com",
    messagingSenderId: "393846467620",
    appId: "1:393846467620:web:ed1ee4a305a6450d7f7cb1",
    measurementId: "G-KR5RHY19SN"
  };
  
  // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 export const db = getFirestore(app);
