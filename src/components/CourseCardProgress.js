import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import CircularProgress from 'react-native-circular-progress-indicator'
import { checkUrlFormat } from '../utils/regex'

const CourseCardProgress = ({
  title,
  duration,
  lessons,
  progress,
  image,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.card}>
        <Image
          source={checkUrlFormat(image) ? { uri: image } : image}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.info}>{duration} phút • </Text>
            <Text style={styles.info}>{lessons} bài học</Text>
          </View>
        </View>
        <View style={styles.progressContainer}>
          <CircularProgress
            value={(progress / lessons) * 100}
            radius={20}
            duration={1000}
            progressValueColor={'#FF6B00'}
            activeStrokeColor={'#FF6B00'}
            inActiveStrokeColor={'#F0F0F0'}
            valueSuffix={'%'}
            inActiveStrokeWidth={5}
            activeStrokeWidth={5}
          />
        </View>
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
  infoContainer: {
    flexDirection: 'row',
    marginTop: 6,
  },
  info: {
    fontSize: 14,
    color: '#FF6B00',
    fontWeight: 'bold',
  },
  progressContainer: {
    marginLeft: 10,
  },
})

export default CourseCardProgress
