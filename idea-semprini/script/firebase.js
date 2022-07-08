
const firebaseConfig = {
  apiKey: "AIzaSyC5Bnt9-Pp10ma6mFmanbPicNirwarI4jU",
  authDomain: "micegenes.firebaseapp.com",
  databaseURL: "https://micegenes-default-rtdb.firebaseio.com/",
  projectId: "micegenes",
  storageBucket: "micegenes.appspot.com",
  messagingSenderId: "779119305145",
  appId: "1:779119305145:web:492fe1808524155f9d9668"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
let database = firebase.database();

let retrieve = firebase.database().ref();

jaulas = []

const getFromFirebase = () => {
  retrieve.on('value', (snapshot) => {
    let data = snapshot.val();
    jaulas = data
  }); 
}


