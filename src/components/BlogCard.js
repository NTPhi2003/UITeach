import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const BlogCard = ({ title, description, image, rating = 5 }) => {
  const renderStars = () => {
    return [...Array(5)].map((_, index) => (
      <Icon
        key={index}
        name='star'
        size={12}
        color={index < rating ? '#FFD700' : '#D3D3D3'}
        style={styles.star}
      />
    ))
  }

  return (
    <TouchableOpacity style={styles.card}>
      <Image source={image} style={styles.image} resizeMode='cover' />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <View style={styles.ratingContainer}>{renderStars()}</View>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.4,
  },
  image: {
    width: 110,
    height: 120,
  },
  content: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  star: {
    marginRight: 2,
  },
  description: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
})

export default BlogCard
