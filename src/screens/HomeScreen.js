import React, { useContext, useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
  FlatList,
  SafeAreaView,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { tempUser } from '../data/User'
import { tempSubjects } from '../data/Subjects'
import { tempExams } from '../data/Exams'
import { Blogs } from '../data/Blogs'
import Icon from 'react-native-vector-icons/Feather'
import Icon2 from 'react-native-vector-icons/MaterialIcons'
import Icon3 from 'react-native-vector-icons/Ionicons'
import CourseCard from '../components/CourseCard'
import BlogCard from '../components/BlogCard'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../context/authContext'

export default function HomeScreen() {
  const [currentSubjectIndex, setCurrentSubjectIndex] = useState(0)
  const [currentExamIndex, setCurrentExamIndex] = useState(0)
  const { user } = useContext(AuthContext)
  const [name, setName] = useState(user?.name.split(' ').pop())
  useEffect(() => {
    if (user) {
      setName(user.name.split(' ').pop())
    }
  }, [user])

  const navigation = useNavigation()

  const limitedSubjects = tempSubjects.slice(0, 3)
  const limitedExams = tempExams.slice(0, 3)

  const handleSubjectScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x
    const index = Math.round(
      scrollPosition / (Dimensions.get('window').width - 32),
    )
    setCurrentSubjectIndex(index)
  }

  const handleExamScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x
    const index = Math.round(
      scrollPosition / (Dimensions.get('window').width - 32),
    )
    setCurrentExamIndex(index)
  }

  const renderSubject = ({ item }) => (
    <CourseCard
      title={item.title}
      description={item.description || ''}
      duration={item.duration}
      image={item.image}
    />
  )

  const renderExam = ({ item }) => (
    <CourseCard
      title={item.title}
      description={item.description || ''}
      duration={item.duration}
      image={item.image}
      onPress={() =>
        navigation.navigate('Exam', {
          screen: 'ExamDetail',
          params: { examData: item },
        })
      }
    />
  )

  return (
    <ScrollView style={styles.container}>
      <StatusBar
        backgroundColor='transparent'
        translucent
        barStyle='dark-content'
      />
      <View style={styles.greetingContainer}>
        <LinearGradient
          colors={['#0066ff', 'rgba(0, 102, 255, 0.7)', 'transparent']}
          start={{ x: 0, y: 1 }} // Điểm bắt đầu (bottom)
          end={{ x: 0, y: 0 }} // Điểm kết thúc (top)
          style={styles.gradient}
        >
          <View style={styles.header}>
            <View style={styles.greeting}>
              <Text style={styles.greetingText}>Hi, {name}</Text>
              <Text style={styles.subText}>Let's start learning!</Text>
            </View>

            <TouchableOpacity style={styles.notificationButton}>
              <View>
                <Icon2 name='notifications' size={24} color='#fff' />
                <View style={styles.badge}>
                  {/* <Text style={styles.badgeText}>1</Text> */}
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.searchContainer}>
            <View style={styles.searchBox}>
              <Icon name='search' size={20} color='#1a75ff' />
              <TextInput
                style={styles.searchInput}
                placeholder='Search'
                placeholderTextColor='#666'
              />
            </View>
            <TouchableOpacity style={styles.filterButton}>
              <Icon name='sliders' size={20} color='#1a75ff' />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>

      {/* Subjects */}
      <View style={styles.subjectsContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Môn học</Text>
          <TouchableOpacity
            style={styles.seeMoreButton}
            onPress={() => navigation.navigate('Courses')}
          >
            <Text style={styles.seeMoreText}>Xem thêm</Text>
            <Icon3 name='chevron-forward' size={16} color='#007AFF' />
          </TouchableOpacity>
        </View>
        <View style={styles.carouselContainer}>
          <FlatList
            data={limitedSubjects}
            renderItem={renderSubject}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            onScroll={handleSubjectScroll}
          />

          <View style={styles.dotContainer}>
            {limitedSubjects.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  currentSubjectIndex === index
                    ? styles.dotActive
                    : styles.dotInactive,
                ]}
              />
            ))}
          </View>
        </View>
      </View>

      {/* Exam */}
      <View style={styles.examContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Đề thi</Text>
          <TouchableOpacity
            style={styles.seeMoreButton}
            onPress={() => navigation.navigate('Exam')}
          >
            <Text style={styles.seeMoreText}>Xem thêm</Text>
            <Icon3 name='chevron-forward' size={16} color='#007AFF' />
          </TouchableOpacity>
        </View>
        <View style={styles.carouselContainer}>
          <FlatList
            data={limitedExams}
            renderItem={renderExam}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            onScroll={handleExamScroll}
          />

          <View style={styles.dotContainer}>
            {limitedExams.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  currentExamIndex === index
                    ? styles.dotActive
                    : styles.dotInactive,
                ]}
              />
            ))}
          </View>
        </View>
      </View>

      {/* Blogs */}
      <View style={styles.blogContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Blog chia sẻ</Text>
          <TouchableOpacity
            style={styles.seeMoreButton}
            onPress={() => navigation.navigate('Exam')}
          >
            <Text style={styles.seeMoreText}>Xem thêm</Text>
            <Icon3 name='chevron-forward' size={16} color='#007AFF' />
          </TouchableOpacity>
        </View>
        <View style={styles.blogContainer}>
          {Blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              title={blog.title}
              description={blog.description}
              image={blog.image}
              rating={blog.rating}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: '#fff',
  },
  greetingContainer: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },
  gradient: {
    // flex: 1,
    // color: ['#0066ff', 'rgba(0, 102, 255, 0.5)', 'transparent']
    paddingVertical: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 30,
  },
  greeting: {
    flex: 1,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subText: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
  },
  notificationButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: 'red',
    borderRadius: 10,
    minWidth: 10,
    height: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // badgeText: {
  //   color: '#fff',
  //   fontSize: 12,
  //   fontWeight: 'bold',
  // },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 10,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    marginLeft: 10,
    fontSize: 16,
  },
  filterButton: {
    width: 45,
    height: 45,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subjectsContainer: {
    marginTop: 30,
  },
  examContainer: {
    marginTop: 30,
  },
  blogContainer: {
    marginTop: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2282FE',
  },
  seeMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  seeMoreText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  carouselContainer: {
    paddingVertical: 20,
    position: 'relative',
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    backgroundColor: '#0066FF',
  },
  dotInactive: {
    backgroundColor: '#D9D9D9',
  },
  blogContainer: {
    paddingVertical: 20,
  },
})
