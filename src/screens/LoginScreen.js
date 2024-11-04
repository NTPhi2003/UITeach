import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard } from 'react-native';
import { AuthContext } from '../App';
import { Ionicons } from '@expo/vector-icons';
import BackButton from '../components/BackButton';
import CustomInput from '../components/CustomInput';
import { tempUser } from '../data/User';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { user,setUser } = useContext(AuthContext);
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (username === '123' && password === '123') {
      setUser(tempUser);
    } else {
      Alert.alert('Tên đăng nhập hoặc mật khẩu không đúng');
    }
  };

  return (

    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <BackButton />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Image 
            source={require('../../assets/UITeach_Logo.png')} 
            style={styles.logo}
          />
          <Text style={styles.title}>Đăng nhập</Text>
          
          <CustomInput
            placeholder="Tên đăng nhập"
            iconName="person-outline"
            value={username}
            onChangeText={setUsername}
            isFocused={usernameFocused}
            onFocus={() => setUsernameFocused(true)}
            onBlur={() => setUsernameFocused(false)}
          />
          
          <CustomInput
            placeholder="Mật khẩu"
            iconName="lock-closed-outline"
            value={password}
            onChangeText={setPassword}
            isFocused={passwordFocused}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
            secureTextEntry={!showPassword}
            rightIcon={showPassword ? "eye-outline" : "eye-off-outline"}
            onRightIconPress={() => setShowPassword(!showPassword)}
          />
          
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
      </TouchableWithoutFeedback>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  inner: {
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
    justifyContent: 'space-around',
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
  innerContainer: {
    alignItems: 'center',
  },
});
