import React from 'react';
import { Dimensions, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('screen');

export default function textButton({ title, onPress, icon, backgroundColor, color,buttonSize,disabled }) {
    const backgroundcolorStyles = {
        backgroundColor: backgroundColor ?? '#5b3a70',
    };
    const colorStyles = {
        color: color ?? '#fff',
    };
    const sizeStyles = {
        width: width / (buttonSize?buttonSize.width:1.5),
        height: height / (buttonSize?buttonSize.height:15),
    };
    return (
        <TouchableOpacity onPress={onPress} disabled={disabled}>
            <View style={[styles.buttonContainer, backgroundcolorStyles,sizeStyles]}>
                <Ionicons style={[styles.icon, colorStyles]} name={icon} />
                <Text style={[styles.text, colorStyles]}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 21,
        fontWeight: 'bold',
    },
    icon: {
        fontSize: 21,
        marginRight: 15,
    },
    buttonContainer: {        
        marginVertical: 7,
        alignItems: 'center',
        borderRadius: 10,
        flexDirection: 'row',
        paddingStart: 20,
    },
});