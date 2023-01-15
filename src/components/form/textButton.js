import React from 'react';
import { Dimensions, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const { width, height } = Dimensions.get('screen');

export default function textButton({ title, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.buttonContainer}>
                <Text style={styles.button}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',

    },
    buttonContainer: {
        width: width/1.5,
        height: height / 15,
        backgroundColor: '#5b3a70',
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        elevation: 5,
        display: "block"
    },
});