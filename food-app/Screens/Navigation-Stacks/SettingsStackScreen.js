import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SettingsScreen from '../Settings';

const SettingsStack = createNativeStackNavigator();

// took out passing fb in props for HomeStack.Screen "Home" because can't find where we're using it in Home.js but may need to add it back in
const SettingsStackScreen = ({ navigation, route }) => {
  return (
    <SettingsStack.Navigator
    screenOptions={{
      headerShown: false
    }}
    >
      <SettingsStack.Screen name="SettingsScreen" component={SettingsScreen}/> 
    </SettingsStack.Navigator>
  );
}

export default SettingsStackScreen;