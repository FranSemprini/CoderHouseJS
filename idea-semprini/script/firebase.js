
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

const getFromFirebase = () => {
  let jaulasFromFB = []
  let idJaulaFromFB = []
  let idRatonFromFB = []
  retrieve.on('value', async (snapshot) => {
    let data = snapshot.val();
    jaulasFromFB = await data
    jaulas = jaulasFromFB.jaulas
    idJaulaFromFB =  await jaulas[0].idJaula
    idRatonFromFB =  await jaulas[0].idRaton
    idJaula = idJaulaFromFB
    idRaton = idRatonFromFB
  });
}

// const getLastChild = () => {
//   toReturn = ``
//   firebase
//     .database()
//     .ref()
//     .limitToLast(1).on(`value`, (snapshot) => {
//       let data = snapshot.val()
//       for (const key in data) {
//         idJaula = Number(key)
//         toReturn = Number(key)
//       }
//     })
//     return toReturn
// }

const pushIdsToFB = (idJaula, idRaton) => {
  firebase
    .database()
    .ref(`jaulas`).child(`0`)
    .set({
      idJaula,
      idRaton
    })
}

const pushAlltoFB =  async () => {
   await firebase
    .database()
    .ref()
    .set({
      jaulas
    })
}

