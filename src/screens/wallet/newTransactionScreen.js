import React, { useState, useEffect } from "react";
import { Text, Dimensions, View, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Colors } from "../../constants/colors";
import { useWalletContext } from "../../context/walletContext";
import { ButtonGroup, FormInput, IconTextButton } from "../../components/form";

const { width, height } = Dimensions.get('screen');
const NewTransactionScreen = ({ navigation }) => {
    const { selectedWallet, transactionType, setTransactionType, addNewTransaction, transactions } = useWalletContext();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState(0);
    useFocusEffect(
        React.useCallback(() => {
            const unsubscribe = () => {
                setTitle("");
                setDescription("");
                setAmount(0);
            };

            return () => unsubscribe();
        }, []));

    const handleAddTransaction = () => {
        let newTransaction = { title: title, description: description, amount: Number(amount), type: transactionType === 0 ? "ingress" : "discharge", walletId: selectedWallet.id }
        addNewTransaction(newTransaction);

        navigation.navigate("Inicio");
    }
    return (
        <View style={styles.container}>
            {selectedWallet?(<View style={styles.newTransactionCard}>
                <Text style={styles.title}>Nueva Transaccion</Text>
                <ButtonGroup buttons={["Ingresos", "Egresos"]} onPressFunction={setTransactionType} />
                <FormInput type={"text"} placeholder="Titulo" backgroundColor={Colors.white} size={{ height: 15, width: 1.35 }} value={title} onChangeText={(value) => setTitle(value)} />
                <FormInput type={"text"} placeholder="Descripción" backgroundColor={Colors.white} size={{ height: 15, width: 1.35 }} value={description} onChangeText={(value) => setDescription(value)} />
                <FormInput type={"numeric"} placeholder={"Monto en " + selectedWallet.currency} backgroundColor={Colors.white} size={{ height: 15, width: 1.35 }} value={amount} onChangeText={(value) => setAmount(value)} />
                <IconTextButton icon="add" title="Agregar" backgroundColor={Colors.secondary} color={Colors.black} buttonSize={{ height: 15, width: 1.35 }} onPress={handleAddTransaction} />
            </View>):<Text style={styles.title}>
                No hay billeteras creadas
            </Text>}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    newTransactionCard: {
        width: width - 50,
        backgroundColor: Colors.primary,
        borderRadius: 25,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.50,
        shadowRadius: 5,
        padding: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.black,
        marginBottom: 20,
    }

});
export default NewTransactionScreen;