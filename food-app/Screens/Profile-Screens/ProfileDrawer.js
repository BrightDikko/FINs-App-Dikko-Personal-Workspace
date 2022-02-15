import * as React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import FirebaseAuthSerivce from '../../firebase/FirebaseAuthService';

import Welcome from '../Welcome';
import ListHistory from '../ListHistory';

const Drawer = createDrawerNavigator();

const ProfileDrawer = ({ navigation, route }) => {

  function handleLogout() {
    FirebaseAuthSerivce.logoutUser();
  }

    return (
      <Drawer.Navigator initialRouteName="Welcome" 
      screenOptions={{
        headerShown: true,
        headerTintColor: '#53B175',
      }}
      drawerContent={props => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem 
              label="Logout"
              onPress={() => {handleLogout()}}
            />
          </DrawerContentScrollView>
        )
      }}
      >
        <Drawer.Screen name="Welcome" component={Welcome} initialParams={ { existingUser: route.params.existingUser} } />
        <Drawer.Screen name="List History" component={ListHistory} />

      </Drawer.Navigator>
    );
  }

export default ProfileDrawer;