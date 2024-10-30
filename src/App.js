import React, { useState, createContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './navigators/RootNavigator';
import useFonts from './hooks/useFonts';

export const AuthContext = createContext();

export default function App() {
  const [user, setUser] = useState(null);
  const fontsLoaded = useFonts();

  if (!fontsLoaded) {
    return null; // hoặc loading screen
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}