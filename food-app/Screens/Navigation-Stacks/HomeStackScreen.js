import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../Home';
import CreateList from '../CreateList';

const HomeStack = createNativeStackNavigator();

// took out passing fb in props for HomeStack.Screen "Home" because can't find where we're using it in Home.js but may need to add it back in
const HomeStackScreen = ({ navigation, route }) => {
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
        options={{ title: 'Home' }}
      />
      <HomeStack.Screen
        name="CreateList"
        component={CreateList}
        options={{ title: 'Your List' }}
        initialParams={{ addList: route.params.addList, showList: route.params.showList }}
      />
    </HomeStack.Navigator>
  );
}

export default HomeStackScreen;