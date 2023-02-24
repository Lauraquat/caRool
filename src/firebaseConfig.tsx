import 'firebase/app';
import firebase from 'firebase/app';
import 'firebase/firestore';

import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
    
export const config ={
    apiKey: "AIzaSyBIdRGfe7wDOSJlK9572Txqra4vNlNgNMo",
    authDomain: "ca-rool-52ff4.firebaseapp.com",
    databaseURL: "https://ca-rool-52ff4-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "ca-rool-52ff4",
    storageBucket: "ca-rool-52ff4.appspot.com",
    messagingSenderId: "393846467620",
    appId: "1:393846467620:web:ed1ee4a305a6450d7f7cb1",
    measurementId: "G-KR5RHY19SN"
}
 export const app = firebase.initializeApp(config);
 export const db = getFirestore(app);

// export async function getEvent() {
//     const eventCol = collection(db, 'event');
//     const eventSnapshot = await getDocs(eventCol);
//     const eventList = eventSnapshot.docs.map(doc => doc.data());
//     return eventList
//     }
