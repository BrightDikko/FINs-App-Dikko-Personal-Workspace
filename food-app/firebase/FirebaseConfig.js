import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCchmgA1eZ02R2ujgR7mmH2H9LjDf8l2mc",
    authDomain: "fins-app-1e96f.firebaseapp.com",
    databaseURL: "https://fins-app-1e96f-default-rtdb.firebaseio.com",
    projectId: "fins-app-1e96f",
    storageBucket: "fins-app-1e96f.appspot.com",
    messagingSenderId: "540945185583",
    appId: "1:540945185583:web:1c211dc0818621ce37ffda"
  };

const fireApp = firebase.initializeApp(firebaseConfig);
if (fireApp != null) {
  console.log('Firebase app up and running');
}

export default firebase;