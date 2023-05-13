// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// const { getStorage} = require("firebase/storage");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// require('dotenv').config()

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBj9rSVGsSEV6cF2TQYupAUHGNw9-iv7a8",
  authDomain: "ehrproj-37cac.firebaseapp.com",
  projectId: "ehrproj-37cac",
  storageBucket: "ehrproj-37cac.appspot.com",
  messagingSenderId: "886429482645",
  appId: "1:886429482645:web:4691bc8545cc35f63fe59c",
  measurementId: "G-CKH611K6CV"
};
const bucket = "gs://ehrproj-37cac.appspot.com"
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);

const storage = getStorage(app);

export {storage,auth};