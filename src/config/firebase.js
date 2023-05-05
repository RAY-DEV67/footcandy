import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import {getFirestore} from "firebase/firestore"

// NEW CONFIG ////////////////////////////

import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/storage"



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Your web app's Firebase configuration
const firebaseApp = firebase.initializeApp( {
  apiKey: "AIzaSyBN2wz4ZzgVoe-CehVgMGC6PxPHn7SDwXE",
  authDomain: "footcandy-9aaa2.firebaseapp.com",
  projectId: "footcandy-9aaa2",
  storageBucket: "footcandy-9aaa2.appspot.com",
  messagingSenderId: "743705941973",
  appId: "1:743705941973:web:c2f5beb28636ddaf99cf5c",
  measurementId: "G-1E69QM3WKZ"
});

// Initialize Firebase
const app = firebaseApp;

const db = firebaseApp.firestore()

// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
// export const db = getFirestore(app)
export const storage = firebase.storage()
export default db


