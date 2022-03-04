import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import UserInfo from '../UserInfo.js';
import PastLists from '../PastLists.js'
import FavoriteLists from '../FavoriteLists.js'
import Preferences from '../Preferences.js'

const Drawer = createDrawerNavigator();

const ProfileDrawer = ({ navigation, route }) => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="UserInfo">
        <Drawer.Screen 
            name="UserInfoScreen"
            component={UserInfo} 
        />
        <Drawer.Screen 
            name="PastListsScreen"
            component={PastLists}
        />
        <Drawer.Screen 
            name="FavoriteListsScreen"
            component={FavoriteLists}
        />
        <Drawer.Screen 
            name="PreferencesScreen"
            component={Preferences}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default ProfileDrawer;