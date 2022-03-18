import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import UserInfo from '../UserInfo.js';
import PastLists from '../PastLists.js'
import FavoriteLists from '../FavoriteLists.js'
import Preferences from '../Preferences.js'

/*
In this section:
  - this stack will include all pages in the profile tab, each as an item in a drawer
  - if we want to change so that not all the pages appear in the drawer, add profile stack and include the drawer as one of the stack screens
  - if some of the items in the tab have multiple screen or other navs, include those as the screens instead
*/

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