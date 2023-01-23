import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, ScrollView, Dimensions } from 'react-native'
import { useWalletContext } from '../../context/walletContext';
import { useAuthContext } from '../../context/authContext';
import { Colors } from '../../constants/colors';
import { typesOfTransactions } from '../../constants/variables';
import { ButtonGroup } from '../../components/form';
import Loading from '../../components/loading';
import { TransactionCard } from '../../components/Wallet';

const { width, height } = Dimensions.get('screen');

const HomeScreen = () => {
  const { selectedWallet, thisMonthTransactions, isLoading, transactionTypeOptions, setTransactionTypeOptions } = useWalletContext();
  const { userProfile, getUserProfile, user } = useAuthContext();
  const [transactionsViewed, setTransactionsViewed] = useState([]);
  useEffect(() => {
    setTransactionsViewed(thisMonthTransactions);
  }, [thisMonthTransactions])
  useEffect(() => {
    switch (transactionTypeOptions) {
      case 0:
        setTransactionsViewed(thisMonthTransactions);
        break;
      case 1:
        setTransactionsViewed(thisMonthTransactions.filter((transaction) => transaction.type === "ingress"));
        break;
      case 2:
        setTransactionsViewed(thisMonthTransactions.filter((transaction) => transaction.type === "discharge"));

      default:
        break;
    }
  }, [transactionTypeOptions]);

  return (isLoading ? (<Loading />) : selectedWallet ? (
    <View style={styles.homeContainer}>
      <ScrollView style={styles.homeScrollableContainer}>
        <Text style={styles.wellcome}>Hola {userProfile.firstname}</Text>
        <View style={styles.walletContainer}>
          <Text style={styles.title}>{selectedWallet.name}</Text>
          <Text style={styles.subtitle}>Cartera</Text>
          <Text style={styles.amount}>{selectedWallet.totalAmount} ${selectedWallet.currency}</Text>
        </View>
        <View style={styles.transactionsContainer}>
          <Text style={styles.transactionsTitle}>Transacciones de este mes</Text>
          <ButtonGroup buttons={["Todos", ...typesOfTransactions]} onPressFunction={setTransactionTypeOptions} />
          <View style={styles.transactionsList}>
            {
              transactionsViewed ?
                (transactionsViewed.map((transaction, index) => (
                  <TransactionCard key={index} transaction={transaction} />
                ))) :
                (<Text style={styles.transactionsListText}>No hay transacciones </Text>)
            }
          </View>
        </View>
      </ScrollView>
    </View>
  ) : (
    <View style={styles.homeContainer}>
      <ScrollView style={styles.homeScrollableContainer}>
        <Text style={styles.wellcome}>Hola {userProfile.firstname ?? userProfile.email}</Text>
        <View style={styles.walletContainer}>
          <Text style={styles.title}>No tienes carteras</Text>
          <Text style={styles.subtitle}>Crea una cartera para empezar a usar la app</Text>
        </View>
      </ScrollView>
    </View>

  ))
}
const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
  },
  homeScrollableContainer: {
    flex: 1,
  },
  wellcome: {
    fontSize: 36,
    fontWeight: 'bold',
    paddingTop: 100,
    paddingHorizontal: 25,
  },
  walletContainer: {
    paddingHorizontal: 25,
    paddingVertical: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.secondary,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.gray
  },
  amount: {
    fontSize: 42,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 25,
    color: Colors.primary,
  },
  transactionsContainer: {
    backgroundColor: Colors.primary,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 25,
    paddingVertical: 25,
    minHeight: height / 1.5,
  },
  transactionsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 25,
  },
  transactionsList: {
    marginVertical: 25,
    flex: 1,
  },
  transactionsListText: {
    color: Colors.white,
    fontSize: 24,
  }
});
export default HomeScreen;
