import React from 'react'
import { Text, View, StyleSheet, Dimensions, Switch } from 'react-native'
import { IconTextButton, FormInput } from '../../components/form';
import { useWalletContext } from '../../context/walletContext';
import { useAuthContext } from '../../context/authContext';

const { width, height } = Dimensions.get('screen');

const NewWalletScreen = ({ navigation }) => {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [currency, setCurrency] = React.useState("USD");
  const [isDefault, setIsDefault] = React.useState(true);
  const { addNewWallet, wallets } = useWalletContext();
  const { user } = useAuthContext();
  const toggleSwitch = () => setIsDefault(previousState => !previousState);
  const goToHome = () => {
    navigation.navigate('Wallets', { screen: 'WalletHome' })
  }
  const saveWallet = () => {
    if (name.length > 0) {
      addNewWallet({ name, description, isDefault,currency }, user.uid);
      goToHome();
    }
  }
  return (
    <View style={styles.container}>
      <IconTextButton title={"Volver"} icon={"arrow-back"} backgroundColor={"transparent"} color={"black"} onPress={goToHome} />
      <View style={styles.formContainer}>
        <View style={styles.formCard}>
          <Text style={styles.formText}>Registra una nueva Cartera</Text>
          <FormInput type={"text"} placeholder={"Nombre"} size={{ width: 1.4, height: 15 }} value={name} onChangeText={setName} />
          <FormInput type={"text"} placeholder={"Descripcion"} size={{ width: 1.4, height: 15 }} value={description} onChangeText={setDescription} />
          <FormInput type={"text"} placeholder={"Moneda"} size={{ width: 1.4, height: 15 }} value={currency} onChangeText={setCurrency} />
          {wallets.length>0 ?
            (<View style={styles.switcher}>
              <Switch value={isDefault} trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isDefault ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch} />
              <Text style={styles.switcherText}>Es tu Cartera predeterminada?</Text>
            </View>)
            : null}
          <IconTextButton title={"Registrar"} icon={"save"} backgroundColor={"#5b3a70"} color={"#fff"} buttonSize={{ width: 1.4, height: 15 }} onPress={saveWallet} />
        </View>
      </View>

    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    width: width,
  },
  formContainer: {
    width: width,
    flex: 1,
    alignItems: 'center',
  },
  switcher: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 20,
  },
  switcherText: {
    fontSize: 16,
    marginLeft: 10,
  },
  formText: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 20,
  },
  formCard: {
    width: width / 1.2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
    borderRadius: 20,
    padding: 25,
    backgroundColor: "#fff",
  }
});
export default NewWalletScreen;