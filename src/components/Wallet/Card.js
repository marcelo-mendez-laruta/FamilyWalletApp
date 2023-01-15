import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { IconButton } from '../form';
import { getRandomColor } from '../../utils';

const { width, height } = Dimensions.get('screen');

function Card({ name, amount, lastTransaction, isDefault }) {

    const backgroundColorStyle = {
        backgroundColor: getRandomColor(),
    };
    return (
        <View style={[styles.container, backgroundColorStyle]}>
            <View style={styles.title}>
                <Text style={styles.name}>{name}</Text>
                <IconButton icon={isDefault ? faStarSolid : faStarRegular} backgroundColor={"transparent"} iconSize={20} />
            </View>
            <Text style={styles.amount}>{amount} $</Text>
            <Text style={styles.lastTransaction}>Ultima transacción: {lastTransaction}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        padding: 0,
        width: width / 1.2,
        height: height / 5,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.50,
        shadowRadius: 5,
        marginVertical: 10,
        elevation: 4,
    },
    title: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingTop: 20,
    },
    name: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 21,
    },
    amount: {
        marginTop: 15,
        marginBottom: 10,
        fontSize: 32,
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