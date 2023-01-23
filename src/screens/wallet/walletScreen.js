import React, { useEffect } from 'react'
import { StyleSheet, View, Dimensions, Text, ScrollView } from 'react-native'
import { Colors } from '../../constants/colors'
import { WalletCard } from '../../components/Wallet'
import IconTextButton from '../../components/form/iconTextButton'
import { useWalletContext } from '../../context/walletContext';
import { Ionicons } from '@expo/vector-icons';
import Loading from '../../components/loading'

const { width, height } = Dimensions.get('screen');

const WalletScreen = ({ navigation }) => {

  const { wallets, isLoading } = useWalletContext();
  return (
    isLoading ? <Loading /> : <View style={styles.container}>
      <IconTextButton
        title="Agregar Billetera"
        icon={"add"}
        backgroundColor={"transparent"}
        color={Colors.black}
        buttonSize={{ width: 1.1, height: 15 }}
        onPress={() => navigation.navigate('Wallets', { screen: 'NewWallet' })}
      />
      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>Recuerda que para seleccionar una cartera necesitas dar click en <Ionicons name={"star-outline"} size={16}></Ionicons></Text>
      </View>
      <ScrollView style={styles.walletsScrollableContainer}>
        {wallets.length > 0 ? wallets.map((r, i) => (<WalletCard key={i} flex={1} name={r.name} amount={r.totalAmount} lastTransaction={r.lastTransaction} currency={r.currency} isDefault={r.isDefault} walletId={r.id} />)) : <Text style={styles.NoWallets}>Aun no tiene ninguna Cartera.</Text>}
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  addWalletButton: {
    fontSize: 40,
    width: width / 1.2,
  },
  title: {
    paddingHorizontal: 0,
    width: width / 1.2,
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  NoWallets: {
    fontSize: 20,
    color: Colors.primary,
    marginTop: 20,
    flex: 1,
  },
  walletsScrollableContainer: {
    flex: 1,
    alignContent: 'center',
  },
  cardContainer: {
    width: width / 1.2,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    padding: 10,
    fontStyle: 'italic',
  },
  cardTitle: {
    fontSize: 15,
    color: Colors.white,
  }
});
export default WalletScreen