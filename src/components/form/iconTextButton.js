import React from 'react';
import { Dimensions, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const { width, height } = Dimensions.get('screen');

export default function textButton({ title, onPress, icon, backgroundColor, color,buttonSize }) {
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
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.buttonContainer, backgroundcolorStyles,sizeStyles]}>
                <FontAwesomeIcon style={[styles.icon, colorStyles]} icon={icon} />
                <Text style={[styles.text, colorStyles]}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 2,
    },
    icon: {
        fontSize: 18,
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