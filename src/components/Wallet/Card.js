
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Ionicons} from '@expo/vector-icons';
import { getRandomColor } from '../../utils';
import { useWalletContext } from '../../context/walletContext';

const { width, height } = Dimensions.get('screen');

function Card({ name, amount,currency, lastTransaction, isDefault, walletId }) {

    const backgroundColorStyle = {
        backgroundColor: getRandomColor(),
    };
    const { setDefaultWallet } = useWalletContext();
    const defineAsDefault = () => {
        setDefaultWallet(walletId)
    }
    return (
        <View style={[styles.container, backgroundColorStyle]}>
            <View style={styles.title}>
                <Text style={styles.name}>{name}</Text>
                <Ionicons.Button backgroundColor={"transparent"} name={isDefault ? "star" : "star-outline"} size={20} onPress={defineAsDefault}></Ionicons.Button>
            </View>
            <Text style={styles.amount}>{amount} ${currency}</Text>
            <Text style={styles.lastTransaction}>Ultima transacción:</Text>
            <Text style={styles.lastTransaction}>{lastTransaction}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        padding: 0,
        width: width / 1.2,
        height: height / 5,
        borderRadius: 20,
        marginVertical: 10,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.50,
        shadowRadius: 5,
    },
    title: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'flex-start',
        paddingLeft: 20,
        paddingTop: 10,
    },
    icon:{
        marginTop:0,
        paddingTop:0,
    },
    name: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 24,
        paddingTop: 10
    },
    amount: {
        marginTop: 5,
        marginBottom: 10,
        fontSize: 42,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
    },
    lastTransaction: {
        color: '#fff',
        marginLeft: 20,
    }
});
export default Card;