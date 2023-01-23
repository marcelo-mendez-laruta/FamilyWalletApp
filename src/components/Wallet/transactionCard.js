import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
const TransactionCard = ({ transaction }) => {
    const [date, setDate] = useState("dd-MM-YYYY");
    useEffect(() => {
        let milliseconds = transaction.createdAt.seconds*1000;
        let dateObject = new Date(milliseconds);
        let humanDateFormat = dateObject.toLocaleString();
        setDate(humanDateFormat);
    }, [])
    return (
        <View style={styles.transactionCard}>
            <View style={styles.transactionCardLeft}>
                <Image
                    style={styles.tinyLogo}
                    source={transaction.type === 'ingress' ? require('../../../assets/Income.png') : require('../../../assets/Outcome.png')}
                />
            </View>
            <View style={styles.transactionCardRight}>
                <Text style={styles.transactionCardTitle}>{transaction.title}</Text>
                <Text style={styles.transactionCardSubtitle}>{date}</Text>
                <Text style={[styles.transactionCardAmount, { color: transaction.type == 'ingress' ? "green" : "red" }]}>{transaction.type == "ingress" ? "+" : "-"}{transaction.amount}</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    transactionCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,

        },
        shadowOpacity: 0.50,
        shadowRadius: 5,
    },
    transactionCardLeft: {
        flex: 1,
        alignItems: 'center',
    },
    transactionCardRight: {
        flex: 3,
        alignItems: 'flex-start',
    },
    transactionCardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    transactionCardSubtitle: {
        fontSize: 12,
        color: '#999',
    },
    transactionCardAmount: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
});

export default TransactionCard;