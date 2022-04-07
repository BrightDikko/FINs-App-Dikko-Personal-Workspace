import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FirebaseAuthSerivce from '../../firebase/FirebaseAuthService';
import {
  Button,
} from 'react-native';

import Home from '../Home';
import List from '../List'

const Stack = createNativeStackNavigator();

// this stack is where screens displayed under the Home tab should be placed
// includes:
//  - list generation screens
//  - potential home screens such as general recomendations, featured items/lists, etc. (these are long term pages)
const HomeStack = ({ navigation, route }) => {



  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTintColor: '#53B175',
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        initialParams={{ existingUser: route.params.existingUser, isRegistered: route.params.isRegistered }}
        options={({ navigation }) => ({
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate('List', {
                addListContext: route.params.addListContext,
                isRegistered: route.params.isRegistered
              })}
              title="New List"
              color='#53B175'
            />
          )
        })}
      />
      <Stack.Screen
        name="List"
        component={List}
        initialParams={{ existingUser: route.params.existingUser, isRegistered: route.params.isRegistered }}
      />
    </Stack.Navigator>
  );
}

export default HomeStack;