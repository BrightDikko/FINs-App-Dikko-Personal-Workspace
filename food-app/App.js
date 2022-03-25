import React, { useState, useEffect } from 'react';

import MainTab from './Screens/Navigators/MainTab';
import LoginStack from './Screens/Navigators/LoginStack';

import firebase from './firebase/FirebaseConfig';
import FirestoreService from './firebase/FirestoreService';

export default function App() {

  const auth = firebase.auth();
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  //   async function handleAddUserInfo(newUserInfo) {
  //     try {
  //       const response = await FirestoreService.createDocument(
  //         'user-context',
  //         newUserInfo
  //       );

  //     } catch (error) {
  //       alert(error.message);
  //     }
  //   }

  //   async function handleNewListContext(newListInfo) {
  //     try {
  //       const response = await FirestoreService.createDocument(
  //         'list-context',
  //         newListInfo
  //       );

  //     } catch (error) {
  //       alert(error.message);
  //     }
  //   }


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
    console.log(user.isAnonymous)
    console.log(user)
    return (
      <MainTab
        name = "MainTab"
        isRegistered={!user.isAnonymous}
        existingUser={user.isAnonymous ? None : user}
      />
    );
  }
}