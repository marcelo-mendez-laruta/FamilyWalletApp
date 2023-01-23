import React from 'react';
import { Dimensions, StyleSheet, TextInput } from 'react-native';

const { width, height } = Dimensions.get('screen');
const FormInput = ({ type, size, ...rest }) => {
  const sizeStyles = {
    width: size ? (width / size.width) : (width / 1.5),
    height: size ? (height / size.height) : (height / 17),
  };
  return (
    <TextInput
      style={[styles.input, sizeStyles]}
      {...rest}
      placeholderTextColor="#666"
      textContentType={type}
      keyboardType={type === 'numeric' ? 'numeric' : 'default'}
    />
  );
}
export default FormInput;
const styles = StyleSheet.create({
  input: {
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: 5,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 18,
  },
});