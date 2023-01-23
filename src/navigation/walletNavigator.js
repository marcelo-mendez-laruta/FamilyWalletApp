import React from 'react';
import { HomeScreen, ProfileScreen, WalletScreen, StatisticsScreen, NewWalletScreen,NewTransactionScreen } from '../screens/wallet';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const WalletNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName='Inicio'
            screenOptions={{
                headerShown: false,
                tabBarLabelStyle: {
                    fontSize: 12,
                },
                tabBarActiveTintColor: Colors.black,
                tabBarInactiveTintColor: Colors.gray,
                tabBarShowLabel: false,
                tabBarStyle: { height: 90 },
            }}
        >
            <Tab.Screen
                name="Inicio"
                component={HomeScreen}
                options={{
                    title: 'Inicio',
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name={focused ? "home" : "home-outline"}
                            size={32}
                            color={Colors.black}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Wallets"
                component={WalletsNavigator}
                options={{
                    title: 'Carteras',
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name={focused ? "wallet" : "wallet-outline"}
                            size={32}
                            color={Colors.black}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Transactions"
                component={NewTransactionScreen}
                options={{
                    title: 'Transacciones',
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name={focused ? "swap-vertical" : "swap-vertical"}
                            size={32}
                            color={focused ?Colors.primary:Colors.black}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Estadisticas"
                component={StatisticsScreen}
                options={{
                    title: 'Estadisticas',
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name={focused ? "bar-chart" : "bar-chart-outline"}
                            size={32}
                            color={Colors.black}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    title: 'Perfil',
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name={focused ? "person-circle" : "person-circle-outline"}
                            size={32}
                            color={Colors.black}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
const WalletsNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="WalletHome"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="WalletHome"
                component={WalletScreen}
            />
            <Stack.Screen name="NewWallet" component={NewWalletScreen} />
        </Stack.Navigator>
    );
}
export default WalletNavigator;