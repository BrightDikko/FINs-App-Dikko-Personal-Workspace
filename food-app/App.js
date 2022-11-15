import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import MainTab from './Navigators/MainTab';
import LoginStack from './Navigators/LoginStack';
import { MainTheme } from './Themes/MainTheme'

import firebase from './firebase/FirebaseConfig';

export default function App() {

  const auth = firebase.auth();
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; 
  }, []);

  if (initializing) return null;
  if (!user) {
    return (
      <LoginStack/>
    )
  } else {
    return (
      <NavigationContainer theme={MainTheme}>
        <MainTab
          name = "MainTab"
          isRegistered={!user.isAnonymous}
          existingUser={user.isAnonymous ? null : user}
        />
       </NavigationContainer>
    );
  }
}