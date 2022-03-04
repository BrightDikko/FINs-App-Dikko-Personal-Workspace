import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import UserIn from '../UserInfo.js';


const Tab = createBottomTabNavigator();

<Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Settings") {
              iconName = focused ? "settings" : "settings-outline";
            } else if (route.name === "My Account") {
              iconName = focused ? "person-circle" : "person-circle-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color="#53B175" />
          },
          tabBarActiveTintColor: "#53B175",
          tabBarInactiveTintColor: "#53B175",
        })}
        >
          <Tab.Screen name="Home" 
            component={HomeStackScreen} 
            initialParams={{ fb: firebase, addListContext:  handleNewListContext, isRegistered: true }}
            options={{ 
              title: 'Home',
              headerTintColor: '#53B175',
            }}
          />
          <Tab.Screen name="Settings" 
            component={SettingsStackScreen} 
            options={{ 
              title: 'Settings',
              headerTintColor: '#53B175',
            }}
          />
          <Tab.Screen name="My Account" 
            component={WelcomeStackScreen} 
            initialParams={{ existingUser: user, addUserInfo: handleAddUserInfo }}
            options={{ 
              title: 'My Account',
              // headerTitleStyle: styles.tabBarHeaderStyle,
              headerTintColor: '#53B175',
                headerLeft: () => (
                  <Button
                    onPress={() => alert('This is a button!')}
                    title="Info"
                    color="#00cc00"
                  />
                ),
            }}
          />
        </Tab.Navigator>