import * as React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

import Welcome from '../Welcome';
import Login from '../Login';
import ListHistory from '../ListHistory';


const Drawer = createDrawerNavigator();

const ProfileDrawer = ({ navigation, route }) => {
    return (
      <Drawer.Navigator initialRouteName="Welcome" 
      screenOptions={{
        drawerActiveBackgroundColor: '#53B175',
        drawerInactiveBackgroundColor: 'B2DFC2',
        drawerLabelStyle: {
          color: '#fff',
        }
      }}
      drawerContent={props => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem label="Logout"
              // { onPress={() => props.navigation.navigate("Login")} 
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