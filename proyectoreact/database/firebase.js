// database/firebase.js

import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAz6jZITnPoyJ2GjGHTzUJTIOb0rCL3cFc",
    authDomain: "reactproyect-906aa.firebaseapp.com",
    projectId: "reactproyect-906aa",
    storageBucket: "reactproyect-906aa.appspot.com",
    messagingSenderId: "88851975001",
    appId: "1:88851975001:web:09dacd6b48fc1d18c41a48",
    measurementId: "G-MX67V5CK5H"
};

firebase.initializeApp(firebaseConfig);

firebase.firestore();

export default firebase;
