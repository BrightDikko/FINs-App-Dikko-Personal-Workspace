import React, { useState, useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from './Screens/Home';
import SettingsScreen from './Screens/Settings';
import LoginScreen from './Screens/Login';
import SignupScreen from './Screens/Signup';
import WelcomeScreen from './Screens/Welcome';

import firebase from './FirebaseConfig';

const Drawer = createDrawerNavigator();

export default function App() {

  const auth = firebase.auth();
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }


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

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Log In">
          <Drawer.Screen name="Home" component={HomeScreen} initialParams={{ fb: firebase }} />
          <Drawer.Screen name="Settings" component={SettingsScreen} />
          <Drawer.Screen name="Log In" component={LoginScreen} />
          <Drawer.Screen name="Sign Up" component={SignupScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }

  else {
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="My Account">
          <Drawer.Screen name="Home" component={HomeScreen} initialParams={{ fb: firebase }} />
          <Drawer.Screen name="Settings" component={SettingsScreen} />
          <Drawer.Screen name="My Account" component={WelcomeScreen} initialParams={{ existingUser: user }} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}
