import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import BackButton from '../components/BackButton'
import CustomInput from '../components/CustomInput'

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [usernameFocused, setUsernameFocused] = useState(false)
  const [emailFocused, setEmailFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <View style={styles.mainContainer}>
      <BackButton />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Image
              source={require('../../assets/UITeach_Logo.png')}
              style={styles.logo}
            />
            <Text style={styles.title}>Đăng ký</Text>

            <CustomInput
              placeholder='Tên đăng nhập'
              iconName='person-outline'
              value={username}
              onChangeText={setUsername}
              isFocused={usernameFocused}
              onFocus={() => setUsernameFocused(true)}
              onBlur={() => setUsernameFocused(false)}
            />

            <CustomInput
              placeholder='Email'
              iconName='mail-outline'
              value={email}
              onChangeText={setEmail}
              isFocused={emailFocused}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
            />

            <CustomInput
              placeholder='Mật khẩu'
              iconName='lock-closed-outline'
              value={password}
              onChangeText={setPassword}
              isFocused={passwordFocused}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              secureTextEntry={!showPassword}
              rightIcon={showPassword ? 'eye-outline' : 'eye-off-outline'}
              onRightIconPress={() => setShowPassword(!showPassword)}
            />

            <CustomInput
              placeholder='Nhập lại mật khẩu'
              iconName='lock-closed-outline'
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              isFocused={confirmPasswordFocused}
              onFocus={() => setConfirmPasswordFocused(true)}
              onBlur={() => setConfirmPasswordFocused(false)}
              secureTextEntry={!showConfirmPassword}
              rightIcon={
                showConfirmPassword ? 'eye-outline' : 'eye-off-outline'
              }
              onRightIconPress={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            />

            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => navigation.navigate('ProfileSetup')}
            >
              <Text style={styles.buttonText}>Tiếp tục</Text>
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

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginText}>
                Đã có tài khoản UITeach?{' '}
                <Text style={styles.linkText}>Đăng nhập</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
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
})
