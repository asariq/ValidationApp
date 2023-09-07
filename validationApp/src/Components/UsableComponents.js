import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import {isIos, windowHeight, windowWidth} from './Global_Constants';

export const SubmitButton = ({title, onPress, disabled}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.container]}
      onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export const InputBox = ({
  title,
  value,
  setValue,
  keyboardType="",
  placeholder,
  secureTextEntry = false,
  onBlur,
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputTitle}>{title}</Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        style={styles.inputBox}
        value={value}
        onChangeText={setValue}
        keyboardType={keyboardType}
        placeholder={placeholder}
        autoCapitalize="none"
        placeholderTextColor={'rgba(255,255,255,0.5)'}
        onBlur={onBlur}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.4)',
    height: windowHeight * 0.06,
    width: windowWidth * 0.8,
    borderRadius: 5,
    marginTop: windowHeight * 0.02,
    marginBottom: windowHeight * 0.02,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  inputContainer: {
    height: windowHeight * 0.1,
    width: windowWidth * 0.8,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: windowHeight * 0.01,
  },
  inputTitle: {
    marginBottom: 4,
    marginLeft: 8,
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  inputBox: {
    height: isIos() ? windowHeight * 0.05 : windowHeight * 0.06,
    width: windowWidth * 0.8,
    borderRadius: 5,
    backgroundColor: 'rgba(52, 52, 52, 0.4)',
    color: 'white',
    paddingHorizontal: 5,
    fontSize: 16,
  },
});
