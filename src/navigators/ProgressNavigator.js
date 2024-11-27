import { createStackNavigator } from '@react-navigation/stack';
import ProgressScreen from '../screens/ProgressScreen';
import StudyScreen from '../screens/StudyScreen';

const Stack = createStackNavigator();

export function ProgressNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProgressMain" component={ProgressScreen} />
      <Stack.Screen name="Study" component={StudyScreen}  />
    </Stack.Navigator>
  );
} 