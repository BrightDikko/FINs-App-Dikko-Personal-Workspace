import * as React from 'react';
import { Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from "@expo/vector-icons/Ionicons";

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
                        image = focused
                          ? require('../assets/images/bottom-tab/UnselectedList.png')
                          : require('../assets/images/bottom-tab/List.png');
                      } else if (route.name === 'Deals') {
                        image = focused 
                            ? require('../assets/images/bottom-tab/UnselectedDeals.png' )
                            : require('../assets/images/bottom-tab/Deals.png');
                      } else if (route.name === 'My Cart') {
                        image = focused 
                            ? require('../assets/images/bottom-tab/UnselectedCart.png' )
                            : require('../assets/images/bottom-tab/Cart.png');
                      } else if (route.name === 'Profile') {
                        image = focused 
                            ? require('../assets/images/bottom-tab/UnselectedAccount.png' )
                            : require('../assets/images/bottom-tab/Account.png');
                      }
                      return <Image 
                        style={styles.icon}
                        source={image} 
                      />;
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