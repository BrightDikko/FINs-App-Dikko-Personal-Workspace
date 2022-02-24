import React from 'react';
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
                  addListContext: route.params.addListContext,
                  
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
        component={ListScreen}
        options={{ 
          title: 'New List'
        }}
      />
    </HomeStack.Navigator>
  );
}

export default HomeStackScreen;