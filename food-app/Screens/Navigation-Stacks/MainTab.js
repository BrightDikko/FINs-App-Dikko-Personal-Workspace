import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from "@expo/vector-icons/Ionicons";

import ProfileStack from './ProfileStack.js';
import CartStack from './CartStack.js'
import HomeStack from './HomeStack.js'

const BottonTab = createBottomTabNavigator();

//  - figure out what to do about the header
//  - check that ion-icon works for Cart Stack

const MainTab = ({ navigation, route }) => {
    return (
        <BottomTab.Navigator
            initialRouteName="HomeStack"
            screenOptions={({ route }) => ({
                // headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === "HomeStack") {
                        iconName = focused ? "home" : "home-outline";
                    } else if (route.name === "CartStack") {
                        iconName = focused ? "cart" : "cart-outline";
                    } else if (route.name === "ProfileStack") {
                        iconName = focused ? "person-circle" : "person-circle-outline";
                    }
                    if (route.name == "CartStack"){
                        // not entirley sure if this is going to work or i need to import something for ion-icon
                        return <ion-icon name={iconName} size={size} color="#53B175"/>
                    }else{
                        return <Ionicons name={iconName} size={size} color="#53B175" />
                    }
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
    )
}

export default MainTab;