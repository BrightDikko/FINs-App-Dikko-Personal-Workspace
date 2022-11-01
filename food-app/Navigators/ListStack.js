import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FirebaseAuthSerivce from '../firebase/FirebaseAuthService';
import {
  Button,
} from 'react-native';

import YourList from '../Screens/YourList';
import SetGoals from '../Screens/SetGoals'

const Stack = createNativeStackNavigator();

// this stack is where screens displayed under the Home tab should be placed
// includes:
//  - list generation screens
//  - potential home screens such as general recomendations, featured items/lists, etc. (these are long term pages)
const ListStack = ({ navigation, route }) => {



  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTintColor: '#FFFFFF',
        headerStyle : {
          backgroundColor: '#70518A'
        }
      }}
      initialRouteName
    >
      <Stack.Screen
        name="Your List"
        component={YourList}
        initialParams={{ existingUser: route.params.existingUser, isRegistered: route.params.isRegistered }}
        options={({ navigation }) => ({
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate('Set Goals', {
                addListContext: route.params.addListContext,
                isRegistered: route.params.isRegistered
              })}
              title="Edit Goals"
              color='#FFFFFF'
            />
          )
        })}
      />
      <Stack.Screen
        name="Set Goals"
        component={SetGoals}
        initialParams={{ existingUser: route.params.existingUser, isRegistered: route.params.isRegistered }}
      />
    </Stack.Navigator>
  );
}

export default ListStack;