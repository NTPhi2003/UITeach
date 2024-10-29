import React, { useState, createContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './navigators/RootNavigator';
import * as Font from 'expo-font';

export const AuthContext = createContext();

export default function App() {
  const [user, setUser] = useState(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Inter-Regular': require('../assets/fonts/Inter_18pt-Regular.ttf'),
        'Inter-Medium': require('../assets/fonts/Inter_18pt-Medium.ttf'),
        'Inter-SemiBold': require('../assets/fonts/Inter_18pt-SemiBold.ttf'),
        'Inter-Bold': require('../assets/fonts/Inter_18pt-Bold.ttf'),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}