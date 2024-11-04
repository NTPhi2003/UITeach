import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // hoặc icon library khác

const SettingItem = ({ icon, title, onPress, showBorder = true }) => {
  return (
    <TouchableOpacity 
      style={[
        styles.container,
        showBorder && styles.borderBottom
      ]} 
      onPress={onPress}
    >
      <View style={styles.leftContent}>
        <Icon name={icon} size={20} color="#333" style={styles.icon} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <Icon name="chevron-right" size={20} color="#999" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    color: '#333',
  },
});

export default SettingItem; 