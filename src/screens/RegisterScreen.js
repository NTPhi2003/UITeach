import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RegisterScreen({ navigation }) {
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/UITeach_Logo.png')} 
        style={styles.logo}
      />
      <Text style={styles.title}>Đăng ký</Text>
      
      <View style={[styles.inputContainer, usernameFocused && styles.inputContainerFocused]}>
        <Ionicons 
          name="person-outline" 
          size={20} 
          color={usernameFocused ? '#007BFF' : '#999'} 
          style={styles.icon}
        />
        <TextInput
          style={[styles.input, { outline: 'none' }]}
          placeholder="Tên đăng nhập"
          onFocus={() => setUsernameFocused(true)}
          onBlur={() => setUsernameFocused(false)}
          placeholderTextColor="#999"
        />
      </View>

      <View style={[styles.inputContainer, emailFocused && styles.inputContainerFocused]}>
        <Ionicons 
          name="mail-outline" 
          size={20} 
          color={emailFocused ? '#007BFF' : '#999'} 
          style={styles.icon}
        />
        <TextInput
          style={[styles.input, { outline: 'none' }]}
          placeholder="Email"
          onFocus={() => setEmailFocused(true)}
          onBlur={() => setEmailFocused(false)}
          placeholderTextColor="#999"
        />
      </View>
      
      <View style={[styles.inputContainer, passwordFocused && styles.inputContainerFocused]}>
        <Ionicons 
          name="lock-closed-outline" 
          size={20} 
          color={passwordFocused ? '#007BFF' : '#999'} 
          style={styles.icon}
        />
        <TextInput
          style={[styles.input, { outline: 'none' }]}
          placeholder="Mật khẩu"
          secureTextEntry={!showPassword}
          onFocus={() => setPasswordFocused(true)}
          onBlur={() => setPasswordFocused(false)}
          placeholderTextColor="#999"
        />
        <Ionicons 
          name={showPassword ? "eye-outline" : "eye-off-outline"}
          size={20} 
          color="#999"
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeIcon}
        />
      </View>

      <View style={[styles.inputContainer, confirmPasswordFocused && styles.inputContainerFocused]}>
        <Ionicons 
          name="lock-closed-outline" 
          size={20} 
          color={confirmPasswordFocused ? '#007BFF' : '#999'} 
          style={styles.icon}
        />
        <TextInput
          style={[styles.input, { outline: 'none' }]}
          placeholder="Nhập lại mật khẩu"
          secureTextEntry={!showConfirmPassword}
          onFocus={() => setConfirmPasswordFocused(true)}
          onBlur={() => setConfirmPasswordFocused(false)}
          placeholderTextColor="#999"
        />
        <Ionicons 
          name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
          size={20} 
          color="#999"
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          style={styles.eyeIcon}
        />
      </View>
      
      <TouchableOpacity 
        style={styles.registerButton}
        onPress={() => navigation.navigate('ProfileSetup')}
      >
        <Text style={styles.buttonText}>Tiếp tục</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Hoặc đăng nhập bằng</Text>
      
      <View style={styles.socialContainer}>
        <TouchableOpacity>
          <Image source={require('../../assets/gg_Logo.png')} style={styles.socialIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../../assets/Facebook_Logo.png')} style={styles.socialIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../../assets/X_Logo.png')} style={styles.socialIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../../assets/Linkedin_Logo.png')} style={styles.socialIcon} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>
          Đã có tài khoản UITeach? <Text style={styles.linkText}>Đăng nhập</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center',
    width: '100%',
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    height: 45,
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
  },
  eyeIcon: {
    paddingRight: 15,
  },
  registerButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#007BFF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    marginVertical: 20,
    color: '#007BFF',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  socialIcon: {
    width: 40,
    height: 40,
  },
  loginText: {
    marginTop: 20,
    color: '#666',
  },
  linkText: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
});
