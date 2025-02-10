import { initializeApp } from 'firebase/app';
import "firebase/firestore";
import "firebase/auth";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDMdtFIOqwtoPkCDojBWTVmGyiaElYUuTU",
    authDomain: "tutorial2-3044d.firebaseapp.com",
    projectId: "tutorial2-3044d",
    storageBucket: "tutorial2-3044d.firebasestorage.app",
    messagingSenderId: "630427305611",
    appId: "1:630427305611:web:ed29798ce8ae9b6b4a768e",
    measurementId: "G-CM6LRXEY6Q"
};

const app = initializeApp(firebaseConfig);
export default app;
export const auth = getAuth(app);