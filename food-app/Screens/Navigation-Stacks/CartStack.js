import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Cart from '../Cart.js';
import PurchaseInfo from '../PurchaseInfo.js'
import ReviewCart from '../ReviewCart.js'

const CartStack = createNativeStackNavigator();

const CartStack = ({ navigation, route }) => {

    return (
        <CartStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <CartStack.Screen
                name="CartScreen"
                component={Cart}
            />
            <CartStack.Screen
                name="PurchaseInfoScreen"
                component={PurchaseInfo}
            />
            <CartStack.Screen
                name="ReviewCartScreen"
                component={ReviewCart}
            /> 
    </CartStack.Navigator>
    );
}

export default CartStack;