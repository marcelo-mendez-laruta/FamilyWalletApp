import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../context/authContext';
import { WalletContext } from '../context/walletContext';
import AuthNavigator from './authNavigator';
import WalletNavigator from './walletNavigator';
import { auth } from '../firebase';

export default function Routes() {
    const { user,setUser,getUserProfile,userProfile } = useContext(AuthContext);
    const { getWallets, selectedWallet, getTransactions } = useContext(WalletContext);
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setUser(user);
        });
    });
    useEffect(() => {
        if (user) {
            getWallets();
            getUserProfile(user.uid);          
        }
    }, [user]);
    useEffect(() => {
        if (user && selectedWallet) {
            getTransactions();   
        }
    }, [user,selectedWallet]);
    return (
        <NavigationContainer>
            {userProfile ? <WalletNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    );
}