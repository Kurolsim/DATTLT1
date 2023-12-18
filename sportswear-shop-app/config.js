import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
    apiKey: "AIzaSyBCSCR3yZE9_2_fFkFn5SCJ-6yZnswBTww",
    authDomain: "test-7af61.firebaseapp.com",
    projectId: "test-7af61",
    storageBucket: "test-7af61.appspot.com",
    messagingSenderId: "1038027879127",
    appId: "1:1038027879127:web2a10204ea16e667a75b692",
    measurementId: "G-T5W8JMDSR7"
};

const app = firebase.initializeApp(firebaseConfig)
export {firebase};
export const db = getFirestore(app);