import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View,
  Text,
  Button,
  Image
} from 'react-native';

import HomeScreen from '../Home-Components/Home';
import ListScreen from '../Home-Components/List'

const HomeStack = createNativeStackNavigator();

// HOW DO I PASS THE STATE DOWN? 

// took out passing fb in props for HomeStack.Screen "Home" because can't find where we're using it in Home.js but may need to add it back in
const HomeStackScreen = ({ navigation, route }) => {

  // const [showContextModal, setShowContextModal] = useState(false);

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
        options={ ({ navigation }) => ({
            title: 'Home',
            headerRight: () => (
              <Button
                onPress={ () => navigation.navigate('ListScreen') } 
                title="New List"
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