import React, { useState, useEffect } from 'react';
import Splash from '../screens/Splash';

import { createStackNavigator } from '@react-navigation/stack';
import Feed from '../screens/Feed';
import Detail from '../screens/Detail';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

export default function RootStackScreen() {

    return (
        <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen
                name="Splash"
                component={Splash}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Feed"
                component={Feed}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Detail"
                component={Detail}
                options={{
                    headerShown: false,
                    gestureEnabled: false,
                    animation: 'fade_from_bottom'
                }}
            />
        </Stack.Navigator>
    );
}