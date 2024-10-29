import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import BackButton from '../components/BackButton';

export default function ProfileSetupScreen({ navigation }) {
  const [nameFocused, setNameFocused] = useState(false);
  const [birthdayFocused, setBirthdayFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [gender, setGender] = useState('');
  const [genderFocused, setGenderFocused] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleComplete = () => {
    setShowSuccessModal(true);
  };

  const handleLoginPress = () => {
    setShowSuccessModal(false);
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <BackButton />

      <Text style={styles.title}>Thông tin cá nhân</Text>

      {/* Avatar Section */}
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Ionicons name="person-outline" size={40} color="#999" />
          <TouchableOpacity style={styles.editIcon}>
            <Ionicons name="pencil" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Form Fields */}
      <View style={[styles.inputContainer, nameFocused && styles.inputContainerFocused]}>
        <Ionicons 
          name="person-outline" 
          size={20} 
          color={nameFocused ? '#007BFF' : '#999'} 
          style={styles.icon}
        />
        <TextInput
          style={[styles.input, { outline: 'none' }]}
          placeholder="Họ và tên"
          onFocus={() => setNameFocused(true)}
          onBlur={() => setNameFocused(false)}
          placeholderTextColor="#999"
        />
      </View>

      <View style={[styles.inputContainer, birthdayFocused && styles.inputContainerFocused]}>
        <Ionicons 
          name="calendar-outline" 
          size={20} 
          color={birthdayFocused ? '#007BFF' : '#999'} 
          style={styles.icon}
        />
        <TextInput
          style={[styles.input, { outline: 'none' }]}
          placeholder="Ngày/tháng/năm sinh"
          onFocus={() => setBirthdayFocused(true)}
          onBlur={() => setBirthdayFocused(false)}
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

      <View style={[styles.inputContainer, phoneFocused && styles.inputContainerFocused]}>
        <Ionicons 
          name="call-outline" 
          size={20} 
          color={phoneFocused ? '#007BFF' : '#999'} 
          style={styles.icon}
        />
        <TextInput
          style={[styles.input, { outline: 'none' }]}
          placeholder="Số điện thoại"
          onFocus={() => setPhoneFocused(true)}
          onBlur={() => setPhoneFocused(false)}
          placeholderTextColor="#999"
          keyboardType="phone-pad"
        />
      </View>

      <View style={[styles.inputContainer, genderFocused && styles.inputContainerFocused]}>
        <Ionicons 
          name="transgender-outline" 
          size={20} 
          color={genderFocused ? '#007BFF' : '#999'} 
          style={styles.icon}
        />
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue) => setGender(itemValue)}
            style={[
              styles.picker,
              { outline: 'none', color: gender ? '#333' : '#999' }
            ]}
            dropdownIconColor="#999"
          >
            <Picker.Item 
              label="Giới tính" 
              value="" 
              style={[styles.pickerItem, styles.placeholderItem]}
            />
            <Picker.Item 
              label="Nam" 
              value="male" 
              style={styles.pickerItem}
            />
            <Picker.Item 
              label="Nữ" 
              value="female" 
              style={styles.pickerItem}
            />
            <Picker.Item 
              label="Khác" 
              value="other" 
              style={styles.pickerItem}
            />
          </Picker>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.continueButton}
        onPress={handleComplete}
      >
        <Text style={styles.buttonText}>Hoàn tất</Text>
      </TouchableOpacity>

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    fontFamily: 'Inter-SemiBold',
  },
  pickerWrapper: {
    flex: 1,
    marginLeft: 10,
    overflow: 'hidden',
  },
  picker: {
    height: 45,
    width: '100%',
    backgroundColor: 'transparent',
    border: 'none',
    outlineWidth: 0,
    outlineStyle: 'none',
    fontFamily: 'Inter-SemiBold',
  },
  pickerItem: {
    fontFamily: 'Inter-SemiBold',
    color: '#333',
  },
  placeholderItem: {
    color: '#999',
    fontFamily: 'Inter-Regular',
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
});
