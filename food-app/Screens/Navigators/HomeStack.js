import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FirebaseAuthSerivce from '../../firebase/FirebaseAuthService';
import {
  Button,
} from 'react-native';

import HomeScreen from '../Home';
import ListScreen from '../List';

const Stack = createNativeStackNavigator();

// this stack is where screens displayed under the Home tab should be placed
// includes:
//  - list generation screens
//  - potential home screens such as general recomendations, featured items/lists, etc. (these are long term pages)
const HomeStack = ({ navigation, route }) => {

//   function handleLogout() {
//     if(route.params.isRegistered){
//       FirebaseAuthSerivce.logoutUser();
//     }else{
//       navigation.navigate('LoginScreen');
//     }
    
//   }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTintColor: '#53B175',
      }}
    >
      <Stack.Screen
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
      <Stack.Screen
        name="ListScreen"
        component={ListScreen}
        options={{
          title: 'New List'
        }}
      />
    </Stack.Navigator>
  );
}

export default HomeStack;