import { createStackNavigator } from '@react-navigation/stack';
import CourseScreen from '../screens/CourseScreen';
import StudyScreen from '../screens/StudyScreen';

const Stack = createStackNavigator();

export function CourseNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CourseMain" component={CourseScreen} />
      <Stack.Screen name="Study" component={StudyScreen}  />
    </Stack.Navigator>
  );
} 