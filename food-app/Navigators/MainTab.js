import * as React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ProfileDrawer from './ProfileDrawer.js';
import CartStack from './CartStack.js'
import ListStack from './ListStack.js'
import DealsStack from './DealsStack.js'
import CustomTabBarButton from '../Components/CustomTabBarButton.js';

const BottomTab = createBottomTabNavigator();

const MainTab = ({ isRegistered, existingUser }) => {
    return (
            <BottomTab.Navigator
                initialRouteName="My List"
                screenOptions={({ route }) => ({
                    tabBarStyle: styles.tabBarStyle,
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                      var image;
                      if (route.name === 'My List') {
                        return <MaterialCommunityIcons style={styles.icon} name="format-list-bulleted" size={25} color={focused ? '#F2AE2E' : '#222B45'} />
                      } else if (route.name === 'Deals') {
                        return <MaterialCommunityIcons style={styles.icon} name="tag-multiple" size={25} color={focused ? '#F2AE2E' : '#222B45'} />
                      } else if (route.name === 'My Cart') {
                        return <MaterialCommunityIcons style={styles.icon} name="cart" size={25} color={focused ? '#F2AE2E' : '#222B45'} />
                      } else if (route.name === 'Profile') {
                        return <MaterialCommunityIcons style={styles.icon} name="account-circle" size={25} color={focused ? '#F2AE2E' : '#222B45'} />
                      }
                    },
                    tabBarInactiveTintColor: '#222B45',
                    tabBarActiveTintColor: '#F2AE2E',
                })
            }>
                <BottomTab.Screen name="My List"
                    component={ListStack}
                    initialParams={ { isRegistered: isRegistered, existingUser: existingUser } }
                    options={{
                        tabBarButton: props => <CustomTabBarButton { ...props} />
                    }}
                />
                <BottomTab.Screen name="Deals"
                    component={DealsStack}
                    initialParams={ { isRegistered: isRegistered, existingUser: existingUser } }
                    options={{
                        tabBarLabel: "Deals",
                        tabBarButton: props => <CustomTabBarButton { ...props} />
                    }}
                />
                <BottomTab.Screen name="My Cart"
                    component={CartStack}
                    initialParams={ { isRegistered: isRegistered, existingUser: existingUser } }
                    options={{
                        tabBarLabel: "My Cart",
                        tabBarButton: props => <CustomTabBarButton { ...props} />
                    }}
                />
                <BottomTab.Screen name="Profile"
                    component={ProfileDrawer}
                    initialParams={ { existingUser: existingUser } }
                    options={{
                        tabBarLabel: "Account",
                        tabBarButton: props => <CustomTabBarButton { ...props} />
                    }}
                />
            </BottomTab.Navigator >
    )
}

export default MainTab;

const styles = StyleSheet.create({
    icon: {
        width: 25,
        height: 25,
        marginBottom: 30
    },
    tabBarStyle: {
        position: 'absolute',
        backgroundColor: '#F7F7F7',
        borderTopWidth: 0,
        height: 88,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2
    }
});