import React, { useContext } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Feather'
import SettingItem from '../components/SettingItem'
import BackButton from '../components/BackButton'
import { tempUser } from '../data/User'
import { AuthContext } from '../context/authContext'

export default function AccountScreen() {
  const { user, setUser } = useContext(AuthContext)
  const ProfileData = [
    {
      id: 1,
      icon: 'calendar',
      title: user?.dateOfBirth ?? tempUser.dateOfBirth,
    },
    {
      id: 2,
      icon: 'mail',
      title: user.email,
    },
    {
      id: 3,
      icon: 'phone',
      title:
        user?.phone && user?.phone.length >= 10
          ? user?.phone
          : tempUser.phoneNumber,
    },
    {
      id: 4,
      icon: 'user',
      title: user.gender,
    },
  ]
  const handleItemPress = (item) => {}

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <BackButton></BackButton>
        {/* Header */}

        <View style={styles.header}>
          <Text style={styles.headerTitle}>Hồ sơ</Text>
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            <TouchableOpacity style={styles.editButton}>
              <Icon name='edit-2' size={16} color='#fff' />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>
            {user?.name && user?.name.length > 0 ? user?.name : user.username}
          </Text>
        </View>

        {/* Settings List */}
        <View style={styles.settingsList}>
          {ProfileData.map((item, index) => (
            <SettingItem
              key={item.id}
              icon={item.icon}
              title={item.title}
              onPress={() => handleItemPress(item)}
              showBorder={index !== ProfileData.length - 1}
            />
          ))}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
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
  settingsList: {},
})

