import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import CourseScreen from '../screens/CourseScreen';
import ProgressScreen from '../screens/ProgressScreen';
import { AccountNavigator } from './AccountNavigator';
import { ExamNavigator } from './ExamNavigator'
import { CourseNavigator } from './CourseNavigator'


const Tab = createBottomTabNavigator();

export function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Category') {
            iconName = focused ? 'grid' : 'grid-outline';
          } else if (route.name === 'Courses') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Account') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Progress') {
            iconName = focused ? 'library' : 'library-outline';
          } else if (route.name === 'Exam') {
            iconName = focused ? 'reader' : 'reader-outline';
          }

          return <Ionicons name={iconName} size={24} color={color} />;
        },
        tabBarActiveTintColor: '#4B7BE5',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          height: 70,
          paddingBottom: 20,
          paddingTop: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'semibold',
        },
      })}
    >
      <Tab.Screen name="Progress" component={ProgressScreen}

      />
      <Tab.Screen name="Courses" component={CourseNavigator} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Exam" component={ExamNavigator} />
      <Tab.Screen name="Account" component={AccountNavigator} />
    </Tab.Navigator>
  );
}