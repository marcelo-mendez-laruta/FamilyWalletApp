import React from 'react'
import { Ionicons} from '@expo/vector-icons';
import { StyleSheet, View,  Text } from 'react-native';
import { useAuthContext } from '../../context/authContext';

const SettingsScreen = () => {
  const { userProfile, error, logout } = useAuthContext();
  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(userProfile)}</Text>
      <Ionicons.Button backgroundColor={"red"} color={"white"} name={"log-out-outline"} size={24} onPress={logout}><Text style={{fontSize: 45}}>Cerrar Sesion</Text></Ionicons.Button>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  }
});
export default SettingsScreen;