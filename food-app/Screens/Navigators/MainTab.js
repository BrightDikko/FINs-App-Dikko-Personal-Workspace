import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from "@expo/vector-icons/Ionicons";

import ProfileStack from './ProfileDrawer.js';
import CartStack from './CartStack.js'
import HomeStack from './HomeStack.js'

const BottomTab = createBottomTabNavigator();
/*
In this section:
 - these are the main tabs of the app once a user authenticates
 - if we want the tabs to differ for guests vs registered users, we will need to make a second main tab nav or use conditional in this component

TODO:
 - figure out what to do about the header
 - check that ion-icon works for Cart Stack
*/

const MainTab = ({ navigation, route, isRegistered }) => {
    console.log("Main Tab: " + isRegistered)
    return (
        <NavigationContainer>
            <BottomTab.Navigator
                initialRouteName="HomeStack"
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === "HomeStack") {
                            iconName = focused ? "home" : "home-outline";
                        } else if (route.name === "CartStack") {
                            iconName = focused ? "cart" : "cart-outline";
                        } else if (route.name === "ProfileStack") {
                            iconName = focused ? "person-circle" : "person-circle-outline";
                        }
                        return <Ionicons name={iconName} size={size} color="#53B175" />
                    },
                    tabBarActiveTintColor: "#53B175",
                    tabBarInactiveTintColor: "#53B175",
                })}
            >
                <BottomTab.Screen name="HomeStack"
                    component={HomeStack}
                />
                <BottomTab.Screen name="CartStack"
                    component={CartStack}
                />
                <BottomTab.Screen name="ProfileStack"
                    component={ProfileStack}
                />
            </BottomTab.Navigator >
        </NavigationContainer>

    )
}

export default MainTab;