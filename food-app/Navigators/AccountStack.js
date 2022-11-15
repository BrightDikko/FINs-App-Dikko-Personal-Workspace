import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import AccountScreen from '../Screens/AccountScreen.js';
import AccountInfoScreen from '../Screens/AccountInfoScreen.js';
import ProfileScreen from '../Screens/ProfileScreen.js';
import SetGoals from '../Screens/SetGoals.js';

const Stack = createNativeStackNavigator();


// this stack is where authentication screens should be placed
// currently includes:
//  - Login Screen
//  - Sign Up Screen    if this becomes a new nav flow, replace with the new navigator  
const AccountStack = ({ navigation, route }) => {

    return (
            <Stack.Navigator
                screenOptions={{
                }}
            >
                <Stack.Screen
                    name="Account"
                    component={AccountScreen}
                    options={{
                        headerStyle: {
                          backgroundColor: '#70518A',
                        },
                        headerTintColor: '#fff',
                    }}
                />
                <Stack.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        headerShown: 'false'
                    }}
                />
                <Stack.Screen
                    name="Account Information"
                    component={AccountInfoScreen}
                />
                <Stack.Screen
                    name="Set Goals"
                    component={SetGoals}
                    initialParams={{ returnScreen: 'Account' }}
                    options={{
                        headerStyle: {
                          backgroundColor: '#70518A',
                        },
                        headerTintColor: '#fff',
                    }}
                />
            </Stack.Navigator>

    );
}

export default AccountStack;