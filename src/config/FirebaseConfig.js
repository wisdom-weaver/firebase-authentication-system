import firebase from "firebase/app";
import "firebase/auth"; //firebase authentication
import "firebase/firestore"; //firebase firestore
import "firebase/analytics"; //firebase analytics

export const firebaseConfig = {
  apiKey: "AIzaSyA_r1R7T2FqB5yMWkVG2s_E-mxAAVE7VQo",
  authDomain: "bettorgames.firebaseapp.com",
  projectId: "bettorgames",
  storageBucket: "bettorgames.appspot.com",
  messagingSenderId: "833703630613",
  appId: "1:833703630613:web:781f43a0f5257dfe6dbb1c",
  measurementId: "G-BF4SDP9DEW",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

export default firebase;
