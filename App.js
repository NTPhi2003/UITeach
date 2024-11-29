import React, { useState, createContext, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { RootNavigator } from './src/navigators/RootNavigator'
import useFonts from './src/hooks/useFonts'
import { registerRootComponent } from 'expo'
import { AuthContext } from './src/context/authContext'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { toast, Toasts } from '@backpackapp-io/react-native-toast'
import { View, StyleSheet, Text } from 'react-native'

function App() {
  const [user, setUser] = useState(null)
  const fontsLoaded = useFonts()

  if (!fontsLoaded) {
    return null // hoặc loading screen
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={styles.container}>
        <AuthContext.Provider value={{ user, setUser }}>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
          <Toasts globalAnimationType='spring' />
        </AuthContext.Provider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default App
