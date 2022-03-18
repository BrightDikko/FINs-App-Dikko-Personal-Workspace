import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Signup from '../Signup.js';
import Login from '../Login.js'

const Stack = createNativeStackNavigator();


// this stack is where authentication screens should be placed
// currently includes:
//  - Login Screen
//  - Sign Up Screen    if this becomes a new nav flow, replace with the new navigator  
const Login = ({ navigation, route }) => {

    return (
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
    );
}

export default LoginStack;