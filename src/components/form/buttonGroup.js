import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';

const BtnGroup = ({ buttons,onPressFunction }) => {

    const [selection, setSelection] = useState(0);
    const handleSelection = (index) => {
        onPressFunction(index)
        setSelection(index);
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.btnGroup}>
                {buttons.map((btn, index) => (
                    <TouchableOpacity key={index} style={[styles.btn, selection === index ? { backgroundColor: Colors.black } : null]} onPress={() => handleSelection(index)}>
                        <Text style={[styles.btnText, selection === index ? { color: "white" } : null]}>{btn}</Text>
                    </TouchableOpacity>
                ))
                }

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    btnGroup: {
        flexDirection: 'row',
        alignItems: "center",
    },
    btn: {
        flex: 1,
        borderRightWidth: 0.25,
        borderLeftWidth: 0.25,
        borderColor: Colors.gray,
        backgroundColor: Colors.white,
        borderRadius: 20,
        marginHorizontal: 10,
    },
    btnText: {
        textAlign: 'center',
        paddingVertical: 16,
        fontSize: 14
    }
});
export default BtnGroup;