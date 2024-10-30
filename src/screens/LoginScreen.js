import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { AuthContext } from '../App';
import { Ionicons } from '@expo/vector-icons';
import BackButton from '../components/BackButton';
export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(AuthContext);
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (username === '21521268@gm.uit.edu.vn' && password === 'nguyenthanhphi') {
      setUser({ email: username });
    } else {
      Alert.alert('Tên đăng nhập hoặc mật khẩu không đúng');
    }
  };

  return (
    <View style={styles.container}>
      <BackButton />
      <Image 
        source={require('../../assets/UITeach_Logo.png')} 
        style={styles.logo}
      />
      <Text style={styles.title}>Đăng nhập</Text>
      
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
          value={username}
          onChangeText={setUsername}
          onFocus={() => setUsernameFocused(true)}
          onBlur={() => setUsernameFocused(false)}
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
          value={password}
          onChangeText={setPassword}
          onFocus={() => setPasswordFocused(true)}
          onBlur={() => setPasswordFocused(false)}
          secureTextEntry={!showPassword}
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
      
      <TouchableOpacity style={styles.forgotPasswordContainer}>
        <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.loginButton} 
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Đăng Nhập</Text>
      </TouchableOpacity>


      
      <Text style={styles.orText}>Hoặc đăng nhập bằng</Text>
      
      <View style={styles.socialContainer}>
        <TouchableOpacity>
          <Image 
            source={require('../../assets/gg_Logo.png')} 
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image 
            source={require('../../assets/Facebook_Logo.png')} 
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image 
            source={require('../../assets/X_Logo.png')} 
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image 
            source={require('../../assets/Linkedin_Logo.png')} 
            style={styles.socialIcon}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.signupText}>
          Chưa có tài khoản? <Text style={styles.linkText}>Đăng ký ngay</Text>
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
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#007BFF',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPasswordContainer: {
    marginTop: 10,
    alignSelf: 'flex-end',
    marginBottom: 20,
    marginRight: 5,
  },
  forgotPasswordText: {
    color: '#007BFF',
    fontSize: 14,
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
  signupText: {
    marginTop: 20,
    color: '#666',
  },
  linkText: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
});
