import firebase from 'firebase/app'
import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5Bnt9-Pp10ma6mFmanbPicNirwarI4jU",
  authDomain: "micegenes.firebaseapp.com",
  projectId: "micegenes",
  storageBucket: "micegenes.appspot.com",
  messagingSenderId: "779119305145",
  appId: "1:779119305145:web:492fe1808524155f9d9668"
};

// Initialize Firebase
const db = getFirestore(app);