import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CustomInput({
  placeholder,
  iconName,
  value,
  onChangeText,
  secureTextEntry,
  isFocused,
  onFocus,
  onBlur,
  rightIcon,
  onRightIconPress,
  keyboardType
}) {
  return (
    <View style={[styles.inputContainer, isFocused && styles.inputContainerFocused]}>
      <Ionicons 
        name={iconName} 
        size={20} 
        color={isFocused ? '#007BFF' : '#999'} 
        style={styles.icon}
      />
      <TextInput
        style={[styles.input, { outline: 'none' }]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocus}
        onBlur={onBlur}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="#999"
        keyboardType={keyboardType}
      />
      {rightIcon && (
        <Ionicons 
          name={rightIcon}
          size={20} 
          color="#999"
          onPress={onRightIconPress}
          style={styles.rightIcon}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    height: 52,
    width: '100%',
  },
  inputContainerFocused: {
    borderColor: '#007BFF',
    borderWidth: 2.5,
  },
  icon: {
    paddingLeft: 15,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 10,
    color: '#333',
    outlineStyle: 'none',
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
  rightIcon: {
    paddingRight: 15,
  },
}); 