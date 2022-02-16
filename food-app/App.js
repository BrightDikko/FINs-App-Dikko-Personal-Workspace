import React, { useState, useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Button,
} from 'react-native';


import HomeScreen from './Screens/Home-Components/Home';
import SettingsScreen from './Screens/Settings';
import LoginScreen from './Screens/Login';
import SignupScreen from './Screens/Signup';
import WelcomeScreen from './Screens/Welcome';
import HomeStackScreen from './Screens/Navigation-Stacks/HomeStackScreen'
import SettingsStackScreen from './Screens/Navigation-Stacks/SettingsStackScreen'
import WelcomeStackScreen from './Screens/Navigation-Stacks/WelcomeStackScreen'

import firebase from './firebase/FirebaseConfig';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

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
            initialParams={{ fb: firebase }}
            options={{ 
              title: 'Home',
              // headerTitleStyle: styles.tabBarHeaderStyle,
              headerTintColor: '#53B175',
            }}
          />
          <Tab.Screen name="Settings" 
            component={SettingsStackScreen} 
            options={{ 
              title: 'Settings',
              // headerTitleStyle: styles.tabBarHeaderStyle,
              headerTintColor: '#53B175',
            }}
          />
          <Tab.Screen name="My Account" 
            component={WelcomeStackScreen} 
            initialParams={{ existingUser: user }}
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
