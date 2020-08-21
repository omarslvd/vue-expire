import firebase from "firebase";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "### FIREBASE API KEY ###",
  authDomain: "### FIREBASE AUTH DOMAIN ###",
  databaseURL: "### CLOUD FIRESTORE PROJECT ID ###",
  projectId: "### CLOUD FIRESTORE PROJECT ID ###",
  storageBucket: "### CLOUD FIRESTORE PROJECT ID ###",
  messagingSenderId: "### CLOUD FIRESTORE PROJECT ID ###",
  appId: "### CLOUD FIRESTORE PROJECT ID ###",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

export default db;
