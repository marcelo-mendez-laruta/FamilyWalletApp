import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from '../screens/auth/loginScreen';
import SignupScreen from '../screens/auth/signupScreen';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
    return (
            <Stack.Navigator initialRouteName="Login"  screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Signup" component={SignupScreen} />
            </Stack.Navigator>
    );
}