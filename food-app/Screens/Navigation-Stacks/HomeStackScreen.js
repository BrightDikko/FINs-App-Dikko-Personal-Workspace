import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FirebaseAuthSerivce from '../../firebase/FirebaseAuthService';
import {
  Button,
} from 'react-native';

import HomeScreen from '../Home';
import CreateList from '../CreateList';
import ListScreen from '../List';

const HomeStack = createNativeStackNavigator();

const HomeStackScreen = ({ navigation, route }) => {

  function handleLogout() {
    if(route.params.isRegistered){
      FirebaseAuthSerivce.logoutUser();
    }else{
      navigation.navigate('LoginScreen');
    }
    
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
        initialParams={{ fb: route.params.fb, isRegistered: route.params.isRegistered }}
        options={({ navigation }) => ({
          title: 'Home',
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate('ListScreen', {
                addListContext: route.params.addListContext,
                isRegistered: route.params.isRegistered
              })}
              title="New List"
              color='#53B175'
            />
          ),
          headerLeft: () => (
            <Button
              onPress={() => { handleLogout() }}
              title="Logout"
              color='#53B175'
            />
          ),
        })}
      />
      <HomeStack.Screen
        name="ListScreen"
        component={ListScreen}
        options={{
          title: 'New List'
        }}
      />
    </HomeStack.Navigator>
  );
}

export default HomeStackScreen;