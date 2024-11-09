import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

// Lấy chiều rộng màn hình
const screenWidth = Dimensions.get('window').width;
// Tính toán padding và margin
const horizontalPadding = 32; // 16 * 2 cho left và right padding
const cardWidth = screenWidth - horizontalPadding;
const CourseCard = ({ title, description, duration, image, onPress }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image 
          source={image} 
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.content}>
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
        <Text style={styles.description} numberOfLines={3}>
          {description}
        </Text>
        <View style={styles.footer}>
          <View style={styles.durationContainer}>
            <Icon name="time-outline" size={16} color="#666" />
            <Text style={styles.duration}>{duration}</Text>
          </View>
          <TouchableOpacity 
            style={styles.button} 
            onPress={onPress}
          >
            <Text style={styles.buttonText}>Học ngay</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: cardWidth, // Sử dụng chiều rộng đã tính
    backgroundColor: 'white',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  imageContainer: {
    height: 280,
    backgroundColor: '#f5f5f5',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0066FF',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    fontWeight: 'bold',
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  duration: {
    marginLeft: 4,
    color: '#666',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#2282FE',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default CourseCard; 