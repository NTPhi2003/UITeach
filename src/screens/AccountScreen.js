import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../App';
import SettingItem from '../components/SettingItem';
import { tempUser } from '../data/User';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

export default function AccountScreen() {
  const { setUser } = useContext(AuthContext);
  const navigation = useNavigation();

  const settingsData = [
    {
      id: 1,
      icon: 'user',
      title: 'Thông tin của tôi',
      screen: 'Profile'
    },
    {
      id: 2,
      icon: 'lock',
      title: 'Đổi mật khẩu',
      screen: 'ChangePassword'
    },
    {
      id: 3,
      icon: 'settings',
      title: 'Cài đặt',
      screen: 'Settings'
    },
    {
      id: 4,
      icon: 'log-out',
      title: 'Đăng xuất',
      screen: 'Login'
    }
  ];

  const handleItemPress = (item) => {
    if (item.title === 'Đăng xuất') {
      Alert.alert(
        'Đăng xuất',
        'Bạn có chắc chắn muốn đăng xuất?',
        [
          {
            text: 'Hủy',
            style: 'cancel',
          },
          {
            text: 'Đồng ý',
            onPress: () => setUser(null),
          },
        ],
      );
    } else {
      navigation.navigate(item.screen);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          
          <Text style={styles.headerTitle}>Hồ sơ</Text>
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source= {tempUser.avatar} // Thay đường dẫn phù hợp
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editButton}>
              <Icon name="edit-2" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{tempUser.name}</Text>
        </View>

        {/* Settings List */}
        <View style={styles.settingsList}>
          {settingsData.map((item, index) => (
            <SettingItem
              key={item.id}
              icon={item.icon}
              title={item.title}
              onPress={() => handleItemPress(item)}
              showBorder={index !== settingsData.length - 1}
            />
          ))}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    marginTop: 30,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  backText: {
    color: '#007AFF',
    fontSize: 16,
    marginLeft: 4,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    fontWeight: '600',
    color: '#000',
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  editButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#007AFF',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  settingsList: {
  },
});