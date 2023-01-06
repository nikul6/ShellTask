import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screen Declaration
import Login from '../screens/Login';
import Disclaimer from '../screens/Disclaimer';
import SelectStation from '../screens/SelectStation';
import Details from '../screens/Details';

const Stack = createNativeStackNavigator();

function ScreenNavigation() {
    return (
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Disclaimer" component={Disclaimer} />
            <Stack.Screen name="SelectStation" component={SelectStation} />
            <Stack.Screen name="Details" component={Details} />
        </Stack.Navigator>
    );
}


export default function Router() {
    return (
        <NavigationContainer>
            <ScreenNavigation />
        </NavigationContainer>
    );
}