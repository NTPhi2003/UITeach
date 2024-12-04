import React, { useContext, useEffect, useState } from 'react'
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
import CourseCardProgress from '../components/CourseCardProgress'
import { tempSubjects } from '../data/Subjects'
import { useQuery } from '@tanstack/react-query'
import { AuthContext } from '../context/authContext'
import { authInstance } from '../axiosInstance/authInstance'
import {
  ALL_PUBLISHED_SUBJECT_API_URL,
  GET_ALL_PROCESS_API_URL,
  GET_PROCESS_API_URL,
} from '../constant/api'

export default function ProgressScreen() {
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  const { user, setUser } = useContext(AuthContext)
  const userEmail = user?.email

  const processQuery = useQuery({
    queryKey: ['process', userEmail],
    queryFn: async () => {
      return await authInstance
        .post(GET_ALL_PROCESS_API_URL, { userEmail })
        .then((res) => {
          const processData = res?.data?.metadata
          return processData
        })
        .catch((err) => {
          if (err.status == 401) {
            setUser(null)
          }
          throw err
        })
    },
    enabled: !!user,
  })

  const processSubjectsQuery = useQuery({
    queryKey: ['process subject learning'],
    queryFn: async () => {
      return await authInstance
        .get(`${ALL_PUBLISHED_SUBJECT_API_URL}`)
        .then((res) => {
          const subjects = res?.data?.metadata
          const subjectsWithProcess = []
          for (let i = 0; i < processQuery.data.length; i++) {
            const tempData = { ...processQuery.data[i] }
            let lessons = tempData.data.length
            let progress = 0
            for (let j = 0; j < lessons; j++) {
              if (tempData.data[j].status) progress++
            }
            tempData.progress = progress
            tempData.lessons = lessons
            delete tempData.data
            subjectsWithProcess.push({
              ...tempData,
              ...subjects.find(
                (subject) => subject.subjectId === tempData.subjectId,
              ),
            })
          }
          return subjectsWithProcess
        })
        .catch((err) => {
          if (err.status == 401) {
            setUser(null)
          }
          throw err
        })
    },
    enabled: processQuery.isSuccess,
  })

  useEffect(() => {
    if (isFocused) {
      StatusBar.setBarStyle('light-content')
    }

    return () => {
      StatusBar.setBarStyle('dark-content')
    }
  }, [isFocused])

  if (processQuery.isPending || processSubjectsQuery.isPending)
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
            <Text style={styles.headerTitle}>Tiến trình học tập</Text>
          </View>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {processSubjectsQuery.data.map((course, index) => (
            <CourseCardProgress
              key={index}
              title={course.title}
              duration={course.duration}
              lessons={course.lessons}
              progress={course.progress}
              image={course.image}
              onPress={() =>
                navigation.navigate('Study', { subjectData: course })
              }
            />
          ))}
        </ScrollView>
      </View>
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
