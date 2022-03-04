import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import ProfileStack from './ProfileStack.js';
import CartStack from './CartStack.js'
// import HomeStack from './HomeStack.js'

const Tab = createBottomTabNavigator();

const ProfileDrawer = ({ navigation, route }) => {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="HomeStack"
                    component={HomeStack}
                />
                <Tab.Screen name="CartStack"
                    component={CartStack}
                />
                <Tab.Screen name="ProfileStack"
                    component={ProfileStack}
                />
            </Tab.Navigator >
        </NavigationContainer>
    )
}

export default ProfileDrawer;