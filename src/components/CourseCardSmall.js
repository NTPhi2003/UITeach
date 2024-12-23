import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { checkUrlFormat } from '../utils/regex'

const CourseCard = ({ title, author, image, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.card}>
        <Image
          source={checkUrlFormat(image) ? { uri: image } : image}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.author}>{author}</Text>
        </View>
        <Image
          source={require('../../assets/play.png')}
          style={styles.playIcon}
        />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F6FF',
    marginHorizontal: 10,
    borderRadius: 12,
    padding: 12,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
  },
  title: {
    fontSize: 16.5,
    fontWeight: 'bold',
    color: '#305F72',
    maxWidth: 190,
  },
  author: {
    fontSize: 14,
    color: '#FF6B00',
    fontWeight: 'bold',
    marginTop: 6,
  },
  playIcon: {
    width: 34,
    height: 34,
  },
})

export default CourseCard

