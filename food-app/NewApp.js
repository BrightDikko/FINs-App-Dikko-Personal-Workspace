import React, { useState, useEffect } from 'react';


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
            <LoginStack />
            <MainTab isRegistered={!user.isAnonymous}/>
        )
    } else {
        return (
            <LoginStack />
        );
    }
}



import React, { useState, useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Button,
} from 'react-native';


import HomeScreen from './Screens/Home';
import SettingsScreen from './Screens/Settings';
import LoginScreen from './Screens/Login';
import SignupScreen from './Screens/Signup';
import HomeStackScreen from './Screens/Navigators/HomeStackScreen'
import SettingsStackScreen from './Screens/Navigators/SettingsStackScreen'
import WelcomeStackScreen from './Screens/Navigators/WelcomeStackScreen'

import firebase from './firebase/FirebaseConfig';
import FirestoreService from './firebase/FirestoreService';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const LoginStack = createNativeStackNavigator();

export default function App() {

  const auth = firebase.auth();
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  
  function onAuthStateChanged(user) {
    setUser(user);
    // console.log(user);
    if (initializing) setInitializing(false);
  }

  async function handleAddUserInfo(newUserInfo) {
    try {
      const response = await FirestoreService.createDocument(
        'user-context',
        newUserInfo
      );

    } catch (error) {
      alert(error.message);
    }
  }

  async function handleNewListContext(newListInfo) {
    try {
      const response = await FirestoreService.createDocument(
        'list-context',
        newListInfo
      );

    } catch (error) {
      alert(error.message);
    }
  }

  const getReq = () => {
    return new Promise((resolve, reject) => {
      let pizzaRef = firebase.firestore().collection('recipes');
      let doc = pizzaRef.get().then((data) => {
        data.forEach(doc => {
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
        <LoginStack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <LoginStack.Screen
            name = "LoginScreen"
            component={LoginScreen}
          />
          <LoginStack.Screen
            name = "HomeNavigation"
            component={HomeStackScreen}
            initialParams={{ fb: firebase, addListContext:  handleNewListContext, isRegistered: false }}
            options={{ 
              title: 'Home',
              headerTintColor: '#53B175',
            }}
          />
        </LoginStack.Navigator>
      </NavigationContainer>
    );
  }

  else {
    return (
      <NavigationContainer>
        <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Settings") {
              iconName = focused ? "settings" : "settings-outline";
            } else if (route.name === "My Account") {
              iconName = focused ? "person-circle" : "person-circle-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color="#53B175" />
          },
          tabBarActiveTintColor: "#53B175",
          tabBarInactiveTintColor: "#53B175",
        })}
        >
          <Tab.Screen name="Home" 
            component={HomeStackScreen} 
            initialParams={{ fb: firebase, addListContext:  handleNewListContext, isRegistered: true }}
            options={{ 
              title: 'Home',
              headerTintColor: '#53B175',
            }}
          />
          <Tab.Screen name="Settings" 
            component={SettingsStackScreen} 
            options={{ 
              title: 'Settings',
              headerTintColor: '#53B175',
            }}
          />
          <Tab.Screen name="My Account" 
            component={WelcomeStackScreen} 
            initialParams={{ existingUser: user, addUserInfo: handleAddUserInfo }}
            options={{ 
              title: 'My Account',
              // headerTitleStyle: styles.tabBarHeaderStyle,
              headerTintColor: '#53B175',
                headerLeft: () => (
                  <Button
                    onPress={() => alert('This is a button!')}
                    title="Info"
                    color="#00cc00"
                  />
                ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
