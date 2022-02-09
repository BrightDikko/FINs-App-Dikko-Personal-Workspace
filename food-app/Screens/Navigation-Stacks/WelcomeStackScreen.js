import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfileDrawer from '../Profile-Screens/ProfileDrawer';

const WelcomeStack = createNativeStackNavigator();

// took out passing fb in props for HomeStack.Screen "Home" because can't find where we're using it in Home.js but may need to add it back in
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
        // options={{
        //   headerStyle: {
        //     backgroundColor: '#f4511e',
        //   },
        //   headerTintColor: '#fff',
        //   headerTitleStyle: {
        //     fontWeight: 'bold',
        //   },
        // }}
      /> 
    </WelcomeStack.Navigator>
  );
}

export default WelcomeStackScreen;