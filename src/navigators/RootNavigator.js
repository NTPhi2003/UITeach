import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { TabNavigator } from './TabNavigator'
import { AuthNavigator } from './AuthNavigator'
import { AuthContext } from '../context/authContext'

const Stack = createStackNavigator()

export function RootNavigator() {
  const { user } = useContext(AuthContext)

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name='MainApp' component={TabNavigator} />
      ) : (
        <Stack.Screen name='Auth' component={AuthNavigator} />
      )}
    </Stack.Navigator>
  )
}
