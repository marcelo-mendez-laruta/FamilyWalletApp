import React from 'react';
import { HomeScreen, SettingsScreen, WalletScreen, StatisticsScreen } from '../screens/wallet';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Colors } from '../constants/colors';
import { faHome, faWallet, faGear, faChartColumn } from '@fortawesome/free-solid-svg-icons';

const Tab = createBottomTabNavigator();
const WalletNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName='Wallets'
            screenOptions={{
                headerShown: false,
                tabBarLabelStyle: {
                    fontSize: 12,
                },
                tabBarActiveTintColor: Colors.black,
                tabBarInactiveTintColor: Colors.gray,
            }}
        >
            <Tab.Screen
                name="Inicio"
                component={HomeScreen}
                options={{
                    title: 'Inicio',
                    tabBarIcon: ({ focused }) => (
                        <FontAwesomeIcon
                            icon={faHome}
                            size={22}
                            color={focused ? Colors.black : Colors.gray}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Wallets"
                component={WalletScreen}
                options={{
                    title: 'Carteras',
                    tabBarIcon: ({ focused }) => (
                        <FontAwesomeIcon
                            icon={faWallet}
                            size={22}
                            color={focused ? Colors.black : Colors.gray}
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
                        <FontAwesomeIcon
                            icon={faChartColumn}
                            size={22}
                            color={focused ? Colors.black : Colors.gray}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    title: 'Opciones',
                    tabBarIcon: ({ focused }) => (
                        <FontAwesomeIcon
                            icon={faGear}
                            size={22}
                            color={focused ? Colors.black : Colors.gray}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
export default WalletNavigator;