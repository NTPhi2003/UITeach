import { createStackNavigator } from '@react-navigation/stack';
import AccountScreen from '../screens/AccountScreen';
import AccountInfoScreen from '../screens/AccountInfoScreen';
import SettingScreen from '../screens/SettingScreen'

const Stack = createStackNavigator();

export function AccountNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AccountMain" component={AccountScreen} />
      <Stack.Screen name="AccountInfo" component={AccountInfoScreen}  />
      <Stack.Screen name="Settings" component={SettingScreen} />
    </Stack.Navigator>
  );
} 