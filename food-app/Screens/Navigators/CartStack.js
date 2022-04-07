import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Cart from '../Cart.js';
import PurchaseInfo from '../PurchaseInfo.js'
import ReviewCart from '../ReviewCart.js'

const Stack = createNativeStackNavigator();

const CartStack = ({ navigation, route }) => {

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="CartScreen"
                component={Cart}
            />
            <Stack.Screen
                name="PurchaseInfoScreen"
                component={PurchaseInfo}
            />
            <Stack.Screen
                name="ReviewCartScreen"
                component={ReviewCart}
            />
        </Stack.Navigator>
    );
}

export default CartStack;