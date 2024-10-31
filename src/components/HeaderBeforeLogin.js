import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView, Platform, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HeaderBeforeLogin() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image 
              source={require('../../assets/UITeach.png')} 
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.loginButton}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.loginText}>ĐĂNG NHẬP</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.registerButton}
              onPress={() => navigation.navigate('Register')}
            >
              <Text style={styles.registerText}>ĐĂNG KÝ</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerContainer: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
    minHeight: 50,
  },
  logoContainer: {
    flex: 0.35,
    marginRight: 8,
  },
  logo: {
    width: '100%',
    height: 30,
    maxWidth: 120,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 0.65,
    justifyContent: 'flex-end',
  },
  loginButton: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: '#007BFF',
    minWidth: 70,
  },
  registerButton: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 15,
    backgroundColor: '#007BFF',
    minWidth: 70,
  },
  loginText: {
    color: '#007BFF',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  registerText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  }
}); 