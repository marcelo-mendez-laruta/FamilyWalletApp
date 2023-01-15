import React, { useState } from 'react';
import { IconTextButton, FormInput } from '../../components/form';
import { faRightToBracket, faIdCard } from '@fortawesome/free-solid-svg-icons';
import { Colors } from '../../constants/colors';
import { Dimensions, StyleSheet, View, Text } from 'react-native';
import { getDay, getMonth, getYear } from '../../utils/date';
import { useAuthContext } from '../../context/authContext';

const { width, height } = Dimensions.get('screen');

export default function SignupScreen({ navigation }) {

    const { registerWithEmailAndPassword } = useAuthContext();
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [hidePass, setHidePass] = useState(true);
    const [day, setDay] = useState(getDay());
    const [month, setMonth] = useState(getMonth());
    const [year, setYear] = useState(getYear());

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Registrate</Text>
            <Text style={styles.subtitleText}>Y manten tu economia en la mira. 🤑</Text>
            <FormInput
                placeholder="Nombre"
                value={firstname}
                type="text"
                onChangeText={(userFirstname) => setFirstName(userFirstname)}
            />
            <FormInput
                placeholder="Apellido"
                value={lastname}
                type="text"
                onChangeText={(userLastname) => setLastname(userLastname)}
            />
            <View style={styles.dateForm}>
                <FormInput
                    placeholder="Día"
                    value={day}
                    type="text"
                    flex={1}
                    size={{ height: 17, width: 5 }}
                    onChangeText={(userDay) => setDay(userDay)}
                />
                <FormInput
                    placeholder="Mes"
                    value={month}
                    type="text"
                    flex={1}
                    marginHorizontal={10}
                    size={{ height: 17, width: 5 }}
                    onChangeText={(userMonth) => setMonth(userMonth)}
                />
                <FormInput
                    placeholder="Año"
                    value={year}
                    type="text"
                    flex={1}
                    size={{ height: 17, width: 5 }}
                    onChangeText={(userYear) => setYear(userYear)}
                />
            </View>
            <FormInput
                placeholder="Correo Electronico"
                value={email}
                type="emailAddress"
                onChangeText={(userEmail) => setEmail(userEmail)}
            />
            <FormInput
                placeholder="Contraseña"
                value={password}
                type="password"
                secureTextEntry={hidePass ? true : false}
                onChangeText={(userPassword) => setPassword(userPassword)}
            />
            <FormInput
                placeholder="Repite tu contraseña"
                value={passwordConfirmation}
                type="password"
                secureTextEntry={hidePass ? true : false}
                onChangeText={(userPassword) => setPasswordConfirmation(userPassword)}
            />
            <IconTextButton
                title="Registrate"
                icon={faIdCard}
                backgroundColor={Colors.primary}
                color={Colors.white}
                onPress={() => {
                    if (password === passwordConfirmation && password.length >= 6 && email.length >= 6 && firstname.length >= 6 && lastname.length >= 6 && passwordConfirmation.length >= 6 ) {
                        registerWithEmailAndPassword(email, password);
                        navigation.navigate('Home');
                    }
                    else{
                        alert('Por favor, verifica que todos los campos esten llenos y que la contraseña sea mayor a 6 caracteres');
                    }
                }}
            />
            <IconTextButton
                title="Ya tengo cuenta"
                icon={faRightToBracket}
                backgroundColor='transparent'
                color={Colors.black}
                onPress={() => navigation.navigate('Login')}
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

        fontWeight: 'bold',
        marginBottom: 10,
        width: width / 1.5,
    },
    subtitleText: {
        fontSize: 16,
        fontWeight: 'light',
        marginBottom: 10,
        width: width / 1.5,
    },
    dateForm: {
        flexDirection: 'row',
        columnGap: 10,
        width: width / 1.5,
    }
});