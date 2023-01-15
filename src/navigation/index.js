import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../context/authContext';
import AuthNavigator from './authNavigator';
import WalletNavigator from './walletNavigator';
import { auth } from '../firebase';

export default function Routes() {
    const { user,setUser } = useContext(AuthContext);
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setUser(user);
        });
    });
    return (
        <NavigationContainer>
            {user ? <WalletNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    );
}