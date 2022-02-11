import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfileDrawer from '../Profile-Screens/ProfileDrawer';

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
        component={ProfileDrawer} 
        initialParams={ { existingUser: route.params.existingUser} }
      /> 
    </WelcomeStack.Navigator>
  );
}

export default WelcomeStackScreen;