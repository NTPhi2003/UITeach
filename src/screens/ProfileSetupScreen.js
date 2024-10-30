import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
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
  
  pickerWrapper: {
    flex: 1,
    marginLeft: 10,
    overflow: 'hidden',
  },
  picker: {
    height: 52,
    width: '100%',
    backgroundColor: 'transparent',
    border: 'none',
    outlineWidth: 0,
    outlineStyle: 'none',
    fontSize: 16,
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
