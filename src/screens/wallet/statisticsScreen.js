import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native'
import { FormInput, IconTextButton } from '../../components/form';
import { useWalletContext } from '../../context/walletContext';
import { Colors } from '../../constants/colors';
import { ScrollView } from 'react-native-gesture-handler';
import { TransactionCard } from '../../components/Wallet';
const { width, height } = Dimensions.get('screen');

const StadisticsScreen = () => {
  const { selectedWallet, transactions } = useWalletContext();
  const [title, setTitle] = useState("");
  const [fromDate, setFromDate] = useState({ day: 0, month: 0, year: 0 });
  const [toDate, setToDate] = useState({ day: 0, month: 0, year: 0 });
  const [transactionsViewed, setTransactionsViewed] = useState([]);
  useEffect(() => {
    setTransactionsViewed(transactions);
  }, [transactions])
  useEffect(() => {
    if (title.length > 0)
      setTransactionsViewed(transactions.filter((transaction) => transaction.title.toLowerCase().includes(title.toLocaleLowerCase())));
    else
      setTransactionsViewed(transactions);
  }, [title]);
  const containerStyle = {
    justifyContent: selectedWallet ? 'flex-start' : 'center',
    marginTop: selectedWallet ? 75 : 0,
  }
  return (<View style={[styles.container, containerStyle]}>
    {selectedWallet ? (
      <>
        <Text style={styles.title}>Historial</Text>
        <FormInput type={"text"} backgroundColor={Colors.white} placeholder={"Busqueda por titulo"} value={title} onChangeText={(value) => setTitle(value)} size={{ height: 17, width: 1.1 }} />
        {1 == 0 ? (<View style={styles.filterContainer}>
          <Text style={styles.subtitle}>Filtro</Text>
          <FormInput type={"text"} backgroundColor={Colors.white} placeholder={"Busqueda por titulo"} value={title} onChangeText={(value) => setTitle(value)} size={{ height: 17, width: 1.3 }} />
          <View>
            <Text style={styles.textWhite}>Desde</Text>
            <View style={styles.dateForm}>
              <FormInput type={"numeric"} backgroundColor={Colors.white} maxLength={2} size={{ height: 17, width: 4.3 }} placeholder={"Día"} value={fromDate.day} onChangeText={(value) => setFromDate({ ...toDate, day: value })} />
              <Text style={styles.dateSlash}>/</Text>
              <FormInput type={"numeric"} backgroundColor={Colors.white} maxLength={2} size={{ height: 17, width: 4.3 }} placeholder={"Mes"} value={fromDate.month} onChangeText={(value) => setFromDate({ ...toDate, month: value })} />
              <Text style={styles.dateSlash}>/</Text>
              <FormInput type={"numeric"} backgroundColor={Colors.white} maxLength={2} size={{ height: 17, width: 4.3 }} placeholder={"Año"} value={fromDate.year} onChangeText={(value) => setFromDate({ ...toDate, year: value })} />
            </View>
          </View>
          <View>
            <Text style={styles.textWhite}>Hasta</Text>
            <View style={styles.dateForm}>
              <FormInput type={"numeric"} backgroundColor={Colors.white} maxLength={2} size={{ height: 17, width: 4.3 }} placeholder={"Día"} value={toDate.day} onChangeText={(value) => setToDate({ ...toDate, day: value })} />
              <Text style={styles.dateSlash}>/</Text>
              <FormInput type={"numeric"} backgroundColor={Colors.white} maxLength={2} size={{ height: 17, width: 4.3 }} placeholder={"Mes"} value={toDate.month} onChangeText={(value) => setToDate({ ...toDate, month: value })} />
              <Text style={styles.dateSlash}>/</Text>
              <FormInput type={"numeric"} backgroundColor={Colors.white} maxLength={2} size={{ height: 17, width: 4.3 }} placeholder={"Año"} value={toDate.year} onChangeText={(value) => setToDate({ ...toDate, year: value })} />
            </View>
          </View>
          <View style={styles.dateForm}>
            <IconTextButton icon={"filter"} title={"Filtrar"} backgroundColor={Colors.secondary} buttonSize={{ height: 17, width: 2.8 }} />
            <IconTextButton icon={"trash"} title={"Limpiar"} backgroundColor={Colors.gray} buttonSize={{ height: 17, width: 2.8 }} />
          </View>
        </View>) : null}
        {transactionsViewed.length > 0 ? (
          <ScrollView style={styles.transactionsContainer}>
            {transactionsViewed.map((transaction, index) => (
              <TransactionCard key={index} transaction={transaction} />
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.title}>No hay transacciones</Text>
        )}
      </>
    ) : (
      <Text style={styles.title}>No hay billeteras creadas</Text>
    )}
  </View>)
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 10,
  },
  transactionsContainer: {
    width: width / 1,
    padding: 25,
  },
  filterContainer: {
    width: width / 1.1,
    backgroundColor: Colors.primary,
    borderRadius: 25,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    padding: 25,
  },
  dateForm: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textWhite: {
    color: Colors.white,
  },
  dateSlash: {
    color: Colors.white,
    marginHorizontal: 5,
    fontSize: 24,
    fontWeight: 'bold',
  }
});

export default StadisticsScreen;