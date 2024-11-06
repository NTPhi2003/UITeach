import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import SettingItem from '../components/SettingItem';
import BackButton from '../components/BackButton';




export default function AccountScreen() {  
    const SettingsData = [
        {
          id: 1,
          icon: 'bell',
          title: 'Quản lý thông báo',
        },
        {
          id: 2,
          icon: 'moon',
          title: 'Chế độ tối',
        },
        {
          id: 3,
          icon: 'globe',
          title: 'Ngôn ngữ',
        },
        {
          id: 4,
          icon: 'youtube',
          title: 'Video đã tải',
        },
        {
          id: 5,
          icon: 'book',
          title: 'Điều khoản sử dụng'
        },
        {
          id: 6,
          icon: 'help-circle',
          title: 'Trợ giúp'
        }
      ];
    const handleItemPress = (item) => {
      
    };
  
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
        <BackButton></BackButton>
          {/* Header */}

          <View style={styles.header}>
            
            <Text style={styles.headerTitle}>Cài đặt</Text>
          </View>
  
          
  
          {/* Settings List */}
          <View style={styles.settingsList}>
            {SettingsData.map((item, index) => (
              <SettingItem
                key={item.id}
                icon={item.icon}
                title={item.title}
                onPress={() => handleItemPress(item)}
                showBorder={index !== SettingsData.length - 1}
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

    settingsList: {
    },
  });