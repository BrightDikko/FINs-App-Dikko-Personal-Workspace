import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FirebaseAuthSerivce from '../../firebase/FirebaseAuthService';
import { View,
  Text,
  Button,
  Image
} from 'react-native';

import HomeScreen from '../Home-Components/Home';
import ListScreen from '../Home-Components/List'

const HomeStack = createNativeStackNavigator();

// took out passing fb in props for HomeStack.Screen "Home" because can't find where we're using it in Home.js but may need to add it back in
const HomeStackScreen = ({ navigation, route }) => {

  function handleLogout() {
    FirebaseAuthSerivce.logoutUser();
}

  return (
    <HomeStack.Navigator
    screenOptions={{
      headerShown: true,
      headerTintColor: '#53B175',
    }}
    >
      <HomeStack.Screen 
        name="HomeScreen"
        component={HomeScreen}
        initialParams={ { fb: route.params.fb}}
        options={ ({ navigation }) => ({
            title: 'Home',
            headerRight: () => (
              <Button
                onPress={ () => navigation.navigate('ListScreen', {
                  fb: route.params.fb,
                  addListContext: route.params.addListContext,
                  // navigation={navigation}
                }) } 
                title="New List"
                color='#53B175'
              />
            ),
            headerLeft: () => (
              <Button
                onPress={ () => {handleLogout()} } 
                title="Logout"
                color='#53B175'
              />
          ),
        })}
      /> 
      <HomeStack.Screen
        name="ListScreen"
        // initialParams={ { fb: route.params.fb, addListContext: route.params.addListContext} }
        component={ListScreen}
        options={{ 
          title: 'New List'
        }}
      />
    </HomeStack.Navigator>
  );
}

export default HomeStackScreen;