import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Signup from '../Screens/Signup.js';
import Login from '../Screens/Login.js'

const Stack = createNativeStackNavigator();


// this stack is where authentication screens should be placed
// currently includes:
//  - Login Screen
//  - Sign Up Screen    if this becomes a new nav flow, replace with the new navigator  
const LoginStack = ({ navigation, route }) => {

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen
                    name="Login"
                    component={Login}
                />
                <Stack.Screen
                    name="SignUp"
                    component={Signup}
                />
            </Stack.Navigator>
        </NavigationContainer>

    );
}

export default LoginStack;