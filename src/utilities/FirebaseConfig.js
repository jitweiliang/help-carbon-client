import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey              : "AIzaSyADmyLWZZy9b7BsNvgCZ0dhk_9HVANrIOc",
    authDomain          : "carbon-project-9a417.firebaseapp.com",
    projectId           : "carbon-project-9a417",
    storageBucket       : "carbon-project-9a417.appspot.com",
    messagingSenderId   : "13145217220",
    appId               : "1:13145217220:web:342be17f5a66840ea9d191"
};


// 0. --- initialize Firebase
const firebase = initializeApp(firebaseConfig);
// 1. --- initialize Firebase Auth
const auth = getAuth(firebase)
// 2. --- initialize Firestore
const fstore = getFirestore();
// 3. --- initialize Cloud Storage
const cstorage = getStorage();


export { firebase, auth, fstore, cstorage };