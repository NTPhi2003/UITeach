import { createStackNavigator } from '@react-navigation/stack';
import ExamScreen from '../screens/ExamScreen';
import ExamDetailScreen from '../screens/ExamDetailScreen';

const Stack = createStackNavigator();

export function ExamNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ExamMain" component={ExamScreen} />
      <Stack.Screen name="ExamDetail" component={ExamDetailScreen} />
    </Stack.Navigator>
  );
}