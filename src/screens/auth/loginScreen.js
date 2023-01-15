import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { IconTextButton, FormInput } from '../../components/form';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faRightToBracket, faIdCard } from '@fortawesome/free-solid-svg-icons';
import { Colors } from '../../constants/colors';
import { useAuthContext } from '../../context/authContext';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hidePass, setHidePass] = useState(true);
    const { user, error, _signInWithGoogle, _signInWithEmailAndPassword } = useAuthContext();
    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Welcome!</Text>
            <FormInput
                placeholder="Correo Electronico"
                value={email}
                type="emailAddress"
                autoCapitalize='none'
                onChangeText={(userEmail) => setEmail(userEmail)}
            />
            <FormInput
                placeholder="Contraseña"
                value={password}
                type="password"
                secureTextEntry={hidePass ? true : false}
                onChangeText={(userPassword) => setPassword(userPassword)}
            />
            <IconTextButton
                title="Ingresar"
                icon={faRightToBracket}
                backgroundColor={Colors.primary}
                color={Colors.white}
                onPress={() => {
                    if (email === '' || password === '') {
                        alert('Please enter your email and password');
                    } else {
                        _signInWithEmailAndPassword(email, password);
                        if (error === null || error === undefined)
                            navigation.navigate('Home');
                        else {
                            alert(error.Message);
                        }

                    }
                }}
            />
            <IconTextButton
                title="Registrate"
                icon={faIdCard}
                backgroundColor={Colors.primary}
                color={Colors.white}
                onPress={() => navigation.navigate('Signup')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText: {
        fontSize: 24,
        marginBottom: 10,
    }
});