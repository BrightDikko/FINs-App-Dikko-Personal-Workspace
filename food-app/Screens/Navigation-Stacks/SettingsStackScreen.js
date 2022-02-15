import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SettingsScreen from '../Settings';

const SettingsStack = createNativeStackNavigator();

const SettingsStackScreen = ({ navigation, route }) => {
  return (
    <SettingsStack.Navigator
    screenOptions={{
      headerShown: true,
      headerTintColor: '#53B175',
    }}
    >
      <SettingsStack.Screen 
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      /> 
        
    </SettingsStack.Navigator>
  );
}

export default SettingsStackScreen;