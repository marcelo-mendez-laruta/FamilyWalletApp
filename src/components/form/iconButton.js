import React from 'react';
import {  StyleSheet, View, TouchableHighlight } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export default function iconButton({ onPress, icon, backgroundColor, color, iconSize }) {
    const backgroundcolorStyles = {
        backgroundColor: backgroundColor ?? '#5b3a70',
    };
    const colorStyles = {
        color: color ?? '#fff',
    };
    return (
        <TouchableHighlight onPress={onPress} underlayColor={color}>
            <View style={[styles.buttonContainer, backgroundcolorStyles]}>
                <FontAwesomeIcon style={[styles.icon, colorStyles]} icon={icon} size={iconSize} />
            </View>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    icon: {
        fontWeight: 'bold',
        marginRight: 15,
        flex: 1,
    },
    buttonContainer: {
        marginTop: 10,
        marginBottom: 10,
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        flexDirection: 'row',
    },
});