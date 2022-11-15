import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Deals from '../Screens/Deals.js'

const Stack = createNativeStackNavigator();

const DealsStack = ({ navigation, route }) => {

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="DealsScreen"
                component={Deals}
            />
        </Stack.Navigator>
    );
}

export default DealsStack;