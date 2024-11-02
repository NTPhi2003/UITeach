import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BackButton from '../components/BackButton';
import CustomInput from '../components/CustomInput';

export default function ProfileSetupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [nameFocused, setNameFocused] = useState(false);
  const [birthdayFocused, setBirthdayFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [gender, setGender] = useState('');
  const [genderFocused, setGenderFocused] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showGenderPicker, setShowGenderPicker] = useState(false);

  const handleComplete = () => {
    setShowSuccessModal(true);
  };

  const handleLoginPress = () => {
    setShowSuccessModal(false);
    navigation.navigate('Login');
  };

  const handleGenderSelect = (value) => {
    setGender(value);
    setShowGenderPicker(false);
    setGenderFocused(false);
  };

  return (
    <View style={styles.mainContainer}>
      <BackButton />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Text style={styles.title}>Thông tin cá nhân</Text>
            {/* Avatar Section  */}
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Ionicons name="person-outline" size={40} color="#999" />
                <TouchableOpacity style={styles.editIcon}>
                  <Ionicons name="pencil" size={16} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>

            <CustomInput
              placeholder="Họ và tên"
              iconName="person-outline"
              value={name}
              onChangeText={setName}
              isFocused={nameFocused}
              onFocus={() => setNameFocused(true)}
              onBlur={() => setNameFocused(false)}
            />

            <CustomInput
              placeholder="Ngày/tháng/năm sinh"
              iconName="calendar-outline"
              value={birthday}
              onChangeText={setBirthday}
              isFocused={birthdayFocused}
              onFocus={() => setBirthdayFocused(true)}
              onBlur={() => setBirthdayFocused(false)}
            />

            <CustomInput
              placeholder="Email"
              iconName="mail-outline"
              value={email}
              onChangeText={setEmail}
              isFocused={emailFocused}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
            />

            <CustomInput
              placeholder="Số điện thoại"
              iconName="call-outline"
              value={phone}
              onChangeText={setPhone}
              isFocused={phoneFocused}
              onFocus={() => setPhoneFocused(true)}
              onBlur={() => setPhoneFocused(false)}
              keyboardType="phone-pad"
            />

            <TouchableOpacity 
              style={[styles.inputContainer, genderFocused && styles.inputContainerFocused]}
              onPress={() => setShowGenderPicker(true)}
            >
              <Ionicons 
                name="transgender-outline" 
                size={20} 
                color={genderFocused ? '#007BFF' : '#999'} 
                style={styles.icon}
              />
              <Text style={[styles.pickerText, !gender && styles.placeholderText]}>
                {gender ? (
                  gender === 'male' ? 'Nam' : 
                  gender === 'female' ? 'Nữ' : 
                  'Khác'
                ) : 'Giới tính'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.continueButton}
              onPress={handleComplete}
            >
              <Text style={styles.buttonText}>Hoàn tất</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      {/* Success Modal */}
      <Modal
        transparent={true}
        visible={showSuccessModal}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.successIconContainer}>
              <Ionicons name="checkmark-circle" size={60} color="#4CAF50" />
            </View>
            
            <Text style={styles.modalTitle}>Đăng ký thành công!</Text>
            <Text style={styles.modalMessage}>
              Tài khoản của bạn đã được tạo thành công
            </Text>

            <TouchableOpacity 
              style={styles.loginButton}
              onPress={handleLoginPress}
            >
              <Text style={styles.buttonText}>Đăng nhập</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Gender Picker Modal */}
      <Modal
        transparent={true}
        visible={showGenderPicker}
        animationType="slide"
      >
        <TouchableWithoutFeedback onPress={() => setShowGenderPicker(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.pickerModalContent}>
                <TouchableOpacity 
                  style={styles.genderOption}
                  onPress={() => handleGenderSelect('male')}
                >
                  <Text style={styles.genderOptionText}>Nam</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.genderOption}
                  onPress={() => handleGenderSelect('female')}
                >
                  <Text style={styles.genderOptionText}>Nữ</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.genderOption}
                  onPress={() => handleGenderSelect('other')}
                >
                  <Text style={styles.genderOptionText}>Khác</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
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
    width: '100%',
    paddingTop: 80,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#007BFF',
    marginBottom: 30,
  },
  avatarContainer: {
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  editIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#007BFF',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  pickerWrapper: {
    flex: 1,
    // height: 52,
    // backgroundColor: 'transparent',
    // justifyContent: 'center',
  },
  picker: {
    height: 52,
    color: '#333',
    backgroundColor: 'transparent',
    marginLeft: -12,
  },
  pickerItem: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#333',
  },
  placeholderItem: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#999',
  },
  continueButton: {
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
    fontFamily: 'Inter-SemiBold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    width: '80%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  successIconContainer: {
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginBottom: 25,
    textAlign: 'center',
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#007BFF',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 52,
    borderRadius: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    paddingHorizontal: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  inputContainerFocused: {
    borderColor: '#007BFF',
    backgroundColor: '#fff',
    shadowColor: '#007BFF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  icon: {
    marginRight: 10,
  },
  pickerText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#333',
  },
  placeholderText: {
    color: '#999',
  },
  pickerModalContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  genderOption: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
    marginVertical: 5,
  },
  genderOptionText: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: '#333',
    textAlign: 'center',
  },
});
