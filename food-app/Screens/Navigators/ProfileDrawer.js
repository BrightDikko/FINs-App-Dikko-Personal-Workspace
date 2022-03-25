import * as React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem
} from '@react-navigation/drawer';

import FirebaseAuthService from '../../firebase/FirebaseAuthService';

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
  console.log("Profile Drawer: " + route.params.existingUser)
  return (
    <Drawer.Navigator drawerContent={props => {
      return (
        <DrawerContentScrollView>
          <DrawerItem label="Logout" onPress={() => FirebaseAuthService.logoutUser()} />
        </DrawerContentScrollView>
      )
    }}>
      <Drawer.Screen
        name="User Info"
        component={UserInfo}
        initialParams= { { existingUser: route.params.existingUser}}
      />
      <Drawer.Screen
        name="Past Lists"
        component={PastLists}
      />
      <Drawer.Screen
        name="Favorite Lists"
        component={FavoriteLists}
      />
      <Drawer.Screen
        name="Preferences"
        component={Preferences}
      />
    </Drawer.Navigator>
  );
}
export default ProfileDrawer;