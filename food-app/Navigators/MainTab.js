import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from "@expo/vector-icons/Ionicons";

import AccountStack from './AccountStack.js';
import CartStack from './CartStack.js'
import ListStack from './ListStack.js'

const BottomTab = createBottomTabNavigator();
/*
In this section:
 - these are the main tabs of the app once a user authenticates
 - if we want the tabs to differ for guests vs registered users, we will need to make a second main tab nav or use conditional in this component

TODO:
 - figure out what to do about the header
 - check that ion-icon works for Cart Stack
*/

const MainTab = ({ isRegistered, existingUser }) => {
    return (
            <BottomTab.Navigator
                initialRouteName="My List"
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === "My List") {
                            iconName = focused ? "home" : "home-outline";
                        } else if (route.name === "CartStack") {
                            iconName = focused ? "cart" : "cart-outline";
                        } else if (route.name === "Account Stack") {
                            iconName = focused ? "person-circle" : "person-circle-outline";
                        }
                        return <Ionicons name={iconName} size={size} color={focused ? "#F2AE2E" : "#2E3A59"}/>
                    },
                    tabBarActiveTintColor: "#F2AE2E",
                    tabBarInactiveTintColor: "#2E3A59",
                })}
            >
                <BottomTab.Screen name="My List"
                    component={ListStack}
                    initialParams={ { isRegistered: isRegistered, existingUser: existingUser } }
                />
                <BottomTab.Screen name="CartStack"
                    component={CartStack}
                    initialParams={ { isRegistered: isRegistered, existingUser: existingUser } }
                />
                <BottomTab.Screen name="Account Stack"
                    component={AccountStack}
                    initialParams={ { existingUser: existingUser } }
                />
            </BottomTab.Navigator >
    )
}

export default MainTab;