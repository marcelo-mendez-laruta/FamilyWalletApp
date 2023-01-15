import React from 'react'
import { Text,View,StyleSheet } from 'react-native'
import { useAuthContext } from '../../context/authContext';

const HomeScreen = () => {
  const { user } = useAuthContext();
  return (
    <View style={styles.homeContainer}>
      <Text>{user.email}</Text>
    </View>    
  )
}
const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default HomeScreen;
