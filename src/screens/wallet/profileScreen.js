import React, { useEffect, useState } from 'react';
import { IconTextButton, FormInput } from '../../components/form';
import { Colors } from '../../constants/colors';
import { Dimensions, StyleSheet, View, Text } from 'react-native';
import { useAuthContext } from '../../context/authContext';

const { width, height } = Dimensions.get('screen');

export default function ProfileScreen({ navigation }) {

    const { user, userProfile, updateProfile, logout } = useAuthContext();

    const [firstname, setFirstName] = useState(userProfile.firstname);
    const [lastname, setLastname] = useState(userProfile.lastname);
    const [email, setEmail] = useState(userProfile.email);
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [hidePass, setHidePass] = useState(true);
    const [day, setDay] = useState(userProfile.day);
    const [month, setMonth] = useState(userProfile.month);
    const [year, setYear] = useState(userProfile.year);
    const [isRegistrationLoading, setIsRegistrationLoading] = useState(false);

    useEffect(() => {
        setFirstName(userProfile.firstname);
        setLastname(userProfile.lastname);
        setEmail(userProfile.email);
        setDay(userProfile.day);
        setMonth(userProfile.month);
        setYear(userProfile.year);
    }, [userProfile]);
    const handleProfileUpdate = () => {
        if (email.length >= 6 && firstname.length >= 6 && lastname.length >= 6) {
            setIsRegistrationLoading(true);
            let newUser = {
                firstname,
                lastname,
                email,
                password,
                day,
                month,
                year,
                uid: user.uid
            };
            updateProfile(newUser).then((user) => {
                setIsRegistrationLoading(false);

            }).finally(() => {
                navigation.navigate('Inicio');
            });

        }
        else {
            alert('Por favor, verifica que todos los campos esten llenos y que la contraseña sea mayor a 6 caracteres');
        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Tu Perfil</Text>
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
                editable={false}
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
                title="Actualizar perfil"
                icon={"person"}
                backgroundColor={isRegistrationLoading ? Colors.gray : Colors.primary}
                disabled={isRegistrationLoading}
                color={Colors.white}
                onPress={handleProfileUpdate}
            />
            <IconTextButton
                title="Cerrar sesión"
                icon={"log-out"}
                backgroundColor={isRegistrationLoading ? Colors.gray : Colors.error}
                disabled={isRegistrationLoading}
                color={Colors.white}
                onPress={logout}
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