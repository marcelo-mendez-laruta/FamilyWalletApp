import { faAdd } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native'
import { Colors } from '../../constants/colors'
import { IconTextButton } from '../../components/form'
import { WalletCard } from '../../components/Wallet'

const { width, height } = Dimensions.get('screen');

const WalletScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tus Billeteras</Text>
      <IconTextButton title={"Agregar Billetera"} icon={faAdd} buttonSize={{ height: 15, width: 1.2 }} backgroundColor={"transparent"} color={"black"} />
      <WalletCard flex={1} name={"Hola"} amount={3000.56} />
      <WalletCard flex={1} name={"Hola"} amount={3000.56} />
      <WalletCard flex={1} name={"Hola"} amount={3000.56} />
      <WalletCard flex={1} name={"Hola"} amount={3000.56} />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'Top',
    marginTop: 100,
  },
  title: {
    paddingHorizontal: 0,
    width: width / 1.2,
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.primary,
  },
});
export default WalletScreen