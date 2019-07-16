import firebase from "firebase";
require("firebase/firestore");

var firebaseConfig = {
  apiKey: "AIzaSyA3GGFXwDwxV-uaWmYRAWx8dL5HMVdm9fY",
  authDomain: "poweron-b15db.firebaseapp.com",
  databaseURL: "https://poweron-b15db.firebaseio.com",
  projectId: "poweron-b15db",
  storageBucket: "",
  messagingSenderId: "351801153822",
  appId: "1:351801153822:web:e7cb6f6751d357da"
};

const fb = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { fb, db };
