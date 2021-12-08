import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from './Screens/Home';
import SettingsScreen from './Screens/Settings';

// import { initializeApp } from 'firebase/app';
// import { getDatabase, ref, onValue, set } from 'firebase/database';

const firebase = require('firebase');

// Your web app's Firebase configuration
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


const Drawer = createDrawerNavigator();

export default function App() {

  const getReq = () => {
    return new Promise((resolve, reject) => {
      let pizzaRef = firebase.firestore().collection('recipes');
      let doc = pizzaRef.get().then((data) => {
        data.forEach(doc => {
          console.log(doc.id, '=>', doc.data())
          resolve(doc.id);
        })
      });
    });
  }

  getReq();

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} initialParams={{ fb: firebase }} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
