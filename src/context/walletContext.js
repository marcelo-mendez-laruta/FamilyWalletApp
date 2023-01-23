import React, { useState, createContext, useContext, useEffect } from 'react';
import { db } from '../firebase';
import { doc, addDoc, serverTimestamp, updateDoc, increment, getDocs, where, query, collection } from "firebase/firestore";
import { useAuthContext } from './authContext';

export const WalletContext = createContext();
export const useWalletContext = () => useContext(WalletContext);

export const WalletProvider = (props) => {
    const [wallets, setWallets] = useState([]);
    const [selectedWallet, setSelectedWallet] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [thisMonthTransactions, setThisMonthTransactions] = useState(null);
    const [newTransaction, setNewTransaction] = useState(null);
    const [transactionType, setTransactionType] = useState(0);
    const [transactionTypeOptions, setTransactionTypeOptions] = useState(0);

    const { user } = useAuthContext();
    const getWallets = async () => {

        try {
            setIsLoading(true);
            let data = [];
            const q = query(collection(db, "wallets"), where("ownerId", "==", user.uid));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                let wallet = doc.data();
                wallet.id = doc.id;
                data.push(wallet);
                if (wallet.isDefault) {
                    setSelectedWallet(wallet);
                }
            });
            setWallets(data);
            setIsLoading(false);

        } catch (e) {
            setIsLoading(false);
            setError(e);
            console.log(e);
        }
    };
    const getTransactions = async () => {
        try {
            setIsLoading(true);
            let data = [];
            let thisMonthData = [];
            const q = query(collection(db, "transactions"), where("walletId", "==", selectedWallet.id));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                let transaction = doc.data();
                transaction.id = doc.id;
                transaction.date = convertTimestamp(transaction.createdAt);
                if (compareMonth(transaction.createdAt)) {
                    thisMonthData.push(transaction);
                }
                data.push(transaction);
            });
            setTransactions(data);
            setThisMonthTransactions(thisMonthData);
            setIsLoading(false);
        } catch (e) {
            setError(e);
        }
    };
    const compareMonth = (date) => {
        const d = new Date(date.seconds * 1000);
        const month = d.getMonth();
        const year = d.getFullYear();
        const today = new Date();
        const todayMonth = today.getMonth();
        const todayYear = today.getFullYear();
        if (month === todayMonth && year === todayYear) {
            return true;
        }
        return false;
    }
    const convertTimestamp = (timestamp) => {
        const d = new Date(timestamp.seconds * 1000);
        const date = d.getDate();
        const month = '0' + (d.getMonth() + 1);
        const year = d.getFullYear();
        return `${date}/${month}/${year}`;
    };
    const addNewTransaction = async (transaction) => {
        try {
            let newTransaction = {
                ...transaction,
                createdAt: serverTimestamp(),
            };
            addDoc(collection(db, "transactions"), newTransaction).then((docRef) => {
                getTransactions();
                setIsLoading(false);
            });
            const walletRef = doc(db, "wallets", transaction.walletId);
            let amount = transaction.type=="ingress"?transaction.amount:(transaction.amount*-1);
            // Atomically increment the population of the city by 50.
            await updateDoc(walletRef, {
                totalAmount: increment(amount),
                lastTransaction:transaction.title
            });
            setDefaultWallet(transaction.walletId);
        } catch (e) {
            setError(e);
        }
    };
    const setDefaultWallet = async (walletId) => {
        try {

            getWallets();
            const newArr = wallets.map(async obj => {
                if (obj.id !== walletId && obj.isDefault) {
                    let updatedWallet = doc(db, "wallets", obj.id);
                    const updateDefault = await updateDoc(updatedWallet, { isDefault: false });
                    return { ...obj, isDefault: false };
                }
                if (obj.id === walletId) {
                    let updatedWallet = doc(db, "wallets", obj.id);
                    const updateDefault = await updateDoc(updatedWallet, { isDefault: true });
                    setSelectedWallet({ ...obj, isDefault: true });
                    return { ...obj, isDefault: true };
                }
            });
            setWallets(newArr);
        } catch (e) {
            setError(e);
        }
    };
    const addNewWallet = async (wallet, ownerId) => {
        try {
            let NewWallet = {
                ...wallet,
                ownerId: ownerId,
                createdAt: serverTimestamp(),
                totalAmount: 0,
                lastTransaction:"Ninguna"
            };
            setIsLoading(true);
            addDoc(collection(db, "wallets"), NewWallet).then((docRef) => {
                setDefaultWallet(docRef.id);
                setIsLoading(false);
            });
        } catch (e) {
            setIsLoading(false);
            setError(e);
            console.log(e);
        }
    };
    return (
        <WalletContext.Provider
            value={{
                wallets,
                getWallets,
                selectedWallet,
                setSelectedWallet,
                addNewWallet,
                setDefaultWallet,
                getTransactions,
                addNewTransaction,
                transactionType,
                setTransactionType,
                isLoading,
                error,
                setError,
                transactions,
                setTransactions,
                thisMonthTransactions,
                setThisMonthTransactions,
                transactionTypeOptions,
                setTransactionTypeOptions,
                newTransaction,
                setNewTransaction,
            }}
        >
            {props.children}
        </WalletContext.Provider>
    );
}

