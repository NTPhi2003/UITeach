import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Image,
  Platform,
  TouchableOpacity,
  Modal,
  Animated,
  ActivityIndicator,
} from 'react-native'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import CourseCard from '../components/CourseCardSmall'
import { tempSubjects } from '../data/Subjects'
import { useQuery } from '@tanstack/react-query'
import { authInstance } from '../axiosInstance/authInstance'
import {
  ALL_PUBLISHED_COURSE_API_URL,
  ALL_PUBLISHED_SUBJECT_API_URL,
} from '../constant/api'

export default function CourseScreen() {
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  const [courseId, setCourseId] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownAnimation = new Animated.Value(0)

  const categories = [
    { id: 1, name: 'Các môn lập trình' },
    { id: 2, name: 'Các môn toán' },
  ]

  const categoriesQuery = useQuery({
    queryKey: ['all-published courses'],
    queryFn: async () => {
      return await authInstance
        .get(`${ALL_PUBLISHED_COURSE_API_URL}`)
        .then((res) => {
          const data = res?.data?.metadata
          setCourseId(data[0].courseId)
          for (let i = 0; i < data.length; i++) {
            data[i].name = `Các môn ${data[i].name.toLowerCase()}`
          }

          return data
        })
        .catch((err) => {
          if (err.status == 401) {
            setUser(null)
          }
          throw err
        })
    },
  })

  const subjectsQuery = useQuery({
    queryKey: ['subjects', courseId],
    queryFn: async () => {
      return await authInstance
        .get(`${ALL_PUBLISHED_SUBJECT_API_URL}${courseId}`)
        .then((res) => {
          return res?.data?.metadata
        })
        .catch((err) => {
          if (err.status == 401) {
            setUser(null)
          }
          throw err
        })
    },
    enabled: categoriesQuery.isSuccess && !!courseId,
  })

  // Lọc subjects theo courseId
  const filteredSubjects = tempSubjects.filter(
    (subject) => subject.courseId === courseId,
  )

  // Animation cho dropdown
  useEffect(() => {
    Animated.timing(dropdownAnimation, {
      toValue: isDropdownOpen ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start()
  }, [isDropdownOpen])

  // Quản lý StatusBar style
  useEffect(() => {
    if (isFocused) {
      StatusBar.setBarStyle('light-content')
      // if (Platform.OS === 'android') {
      //   StatusBar.setBackgroundColor('#2F6BFF');
      //   StatusBar.setTranslucent(true);
      // }
    }

    return () => {
      // Cleanup khi unmount hoặc không focus
      StatusBar.setBarStyle('dark-content')
      // if (Platform.OS === 'android') {
      //   StatusBar.setBackgroundColor('#FFFFFF');
      //   StatusBar.setTranslucent(false);
      // }
    }
  }, [isFocused])
  if (categoriesQuery.isPending || subjectsQuery.isPending)
    return (
      <SafeAreaView
        style={[
          styles.container,
          { justifyContent: 'center', alignItems: 'center' },
        ]}
      >
        <ActivityIndicator color='white' size='large' />
      </SafeAreaView>
    )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Icon
            name='arrow-back'
            size={24}
            color='#fff'
            style={styles.backButton}
            onPress={() => navigation.navigate('Home')}
          />
          <View style={styles.headerTitleContainer}>
            <Image
              source={require('../../assets/animalBox.png')}
              style={styles.headerIcon}
              resizeMode='contain'
            />
            <TouchableOpacity
              style={styles.categorySelector}
              onPress={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <Text style={styles.headerTitle}>
                {
                  categoriesQuery.data.find((cat) => cat.courseId === courseId)
                    ?.name
                }
              </Text>
              <Animated.View
                style={{
                  transform: [
                    {
                      rotate: dropdownAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '180deg'],
                      }),
                    },
                  ],
                }}
              >
                <Icon name='chevron-down' size={20} color='#fff' />
              </Animated.View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {subjectsQuery.data.map((course) => (
            <CourseCard
              key={course.subjectId}
              title={course.title}
              author={course.teachBy}
              image={course.image}
              onPress={() =>
                navigation.navigate('Study', { subjectData: course })
              }
            />
          ))}
        </ScrollView>
      </View>

      {isDropdownOpen && (
        <Animated.View
          style={[
            styles.dropdownMenu,
            {
              opacity: dropdownAnimation,
              transform: [
                {
                  translateY: dropdownAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-20, 0],
                  }),
                },
              ],
            },
          ]}
        >
          {categoriesQuery.data.map((category) => (
            <TouchableOpacity
              key={category.courseId}
              style={[
                styles.dropdownItem,
                courseId === category.courseId && styles.selectedDropdownItem,
              ]}
              onPress={() => {
                setCourseId(category.courseId)
                setIsDropdownOpen(false)
              }}
            >
              <View style={styles.dropdownItemContent}>
                <Icon
                  name={
                    courseId === category.courseId
                      ? 'radio-button-on'
                      : 'radio-button-off'
                  }
                  size={22}
                  color='#2F6BFF'
                  style={styles.dropdownIcon}
                />
                <Text
                  style={[
                    styles.dropdownText,
                    courseId === category.courseId &&
                      styles.selectedDropdownText,
                  ]}
                >
                  {category.name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </Animated.View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2F6BFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: 12,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height: 50,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    zIndex: 1,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  headerIcon: {
    width: 60,
    height: 60,
    marginRight: 6,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
    marginRight: 6,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 10,
  },
  scrollView: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 0,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  categoryIcon: {
    marginRight: 12,
  },
  categoryText: {
    fontSize: 16,
    color: '#333',
  },
  selectedCategory: {
    color: '#2F6BFF',
    fontWeight: '500',
  },
  categorySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 100,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    zIndex: 1000,
  },
  dropdownItem: {
    borderRadius: 12,
    marginVertical: 2,
  },
  selectedDropdownItem: {
    backgroundColor: '#F0F6FF',
  },
  dropdownItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  dropdownIcon: {
    marginRight: 12,
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  selectedDropdownText: {
    color: '#2F6BFF',
    fontWeight: '500',
  },
})
