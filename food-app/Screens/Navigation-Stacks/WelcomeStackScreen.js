import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from '../Welcome.js';

const WelcomeStack = createNativeStackNavigator();

const WelcomeStackScreen = ({ navigation, route }) => {

  return (
    <WelcomeStack.Navigator
    screenOptions={{
      headerShown: false
    }}
    >
      <WelcomeStack.Screen 
        name="WelcomeScreen" 
        component={WelcomeScreen} 
        initialParams={ { existingUser: route.params.existingUser, addUserInfo: route.params.addUserInfo} }
      /> 
    </WelcomeStack.Navigator>
  );
}

export default WelcomeStackScreen;