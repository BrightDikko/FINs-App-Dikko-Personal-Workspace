import React, { useState, useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from "@expo/vector-icons/Ionicons";
import {
    Button,
} from 'react-native';


// import HomeScreen from './Screens/Home';
// import SettingsScreen from './Screens/Settings';
// import LoginScreen from './Screens/Login';
// import SignupScreen from './Screens/Signup';
// import HomeStackScreen from './Screens/Navigation-Stacks/HomeStackScreen'
// import SettingsStackScreen from './Screens/Navigation-Stacks/SettingsStackScreen'
// import WelcomeStackScreen from './Screens/Navigation-Stacks/WelcomeStackScreen'

import MainTab from './Screens/Navigators/MainTab';
import LoginStack from './Screens/Navigators/LoginStack';


import firebase from './firebase/FirebaseConfig';
import FirestoreService from './firebase/FirestoreService';

// const Drawer = createDrawerNavigator();
// const Tab = createBottomTabNavigator();
// const LoginStack = createNativeStackNavigator();

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

    //   const getReq = () => {
    //     return new Promise((resolve, reject) => {
    //       let pizzaRef = firebase.firestore().collection('recipes');
    //       let doc = pizzaRef.get().then((data) => {
    //         data.forEach(doc => {
    //           resolve(doc.id);
    //         })
    //       });
    //     });
    //   }

    //   getReq();

    useEffect(() => {
        const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    //   if (initializing) return null;

    //   if (!user) {
    //     return (
    //       <NavigationContainer>
    //         <LoginStack.Navigator
    //           screenOptions={{
    //             headerShown: false
    //           }}
    //         >
    //           <LoginStack.Screen
    //             name = "LoginScreen"
    //             component={LoginScreen}
    //           />
    //           <LoginStack.Screen
    //             name = "HomeNavigation"
    //             component={HomeStackScreen}
    //             initialParams={{ fb: firebase, addListContext:  handleNewListContext, isRegistered: false }}
    //             options={{ 
    //               title: 'Home',
    //               headerTintColor: '#53B175',
    //             }}
    //           />
    //         </LoginStack.Navigator>
    //       </NavigationContainer>
    //     );
    //   }

    if (initializing) return null;
    if (!user) {
        return (
            <MainTab isRegistered={!user.isAnonymous}/>
        )
    } else {
        return (
            <LoginStack />
        );
    }
}