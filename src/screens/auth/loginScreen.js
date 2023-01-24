import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { IconTextButton, FormInput } from '../../components/form';
import { Colors } from '../../constants/colors';
import { useAuthContext } from '../../context/authContext';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hidePass, setHidePass] = useState(true);
    const { user, error, setError, _signInWithGoogle, _signInWithEmailAndPassword } = useAuthContext();
    useEffect(() => {
        if (error) {
            console.log(error);
            alert(error.Message);
        }
    }, [error]);

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Bienvenido</Text>
            <Image source={require('../../../assets/icon.png')} style={{ width: 200, height: 200 }} />
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
                icon={"log-in"}
                backgroundColor={Colors.primary}
                color={Colors.white}
                onPress={() => {
                    setError(null);
                    if (email === '' || password === '') {
                        alert('Please enter your email and password');
                    } else {
                        _signInWithEmailAndPassword(email, password);
                        if (error === null || error === undefined)
                            navigation.navigate('Inicio');


                    }
                }}
            />
            <IconTextButton
                title="Registrate"
                icon={"person-add"}
                backgroundColor={Colors.secondary}
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
        fontSize: 36,
        marginBottom: 10,
        color: Colors.primary, 
        fontWeight: 'bold',

    }
});