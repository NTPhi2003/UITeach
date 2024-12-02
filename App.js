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
import { USER_INFO } from './src/constant/nameOfKey'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const client = new QueryClient()

function App() {
  const [user, setUser] = useState(null)
  const fontsLoaded = useFonts()
  useEffect(() => {
    ;(async function () {
      try {
        const value = await AsyncStorage.getItem(USER_INFO)
        setUser(value != null ? JSON.parse(value) : null)
      } catch (e) {
        console.log(e)
      }
    })()
  }, [])

  if (!fontsLoaded) {
    return null // hoặc loading screen
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={styles.container}>
        <QueryClientProvider client={client}>
          <AuthContext.Provider value={{ user, setUser }}>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
            <Toasts globalAnimationType='spring' />
          </AuthContext.Provider>
        </QueryClientProvider>
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
