import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { useTheme } from '../hooks/theme'
import HomeScreen from '../screens/HomeScreen'

export type AppStackParamList = {
  Home: undefined
}

const App = createNativeStackNavigator<AppStackParamList>()

const AppRoutes: React.FC = () => {
  const theme = useTheme()

  return (
    <App.Navigator
      screenOptions={{
        headerTintColor: theme.colors.actionBar.text,
        headerStyle: {
          backgroundColor: theme.colors.actionBar.background,
        },
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
        animation: 'fade_from_bottom'
      }}
    >
      <App.Screen component={HomeScreen} name="Home" options={{ title: 'Início' }} />
    </App.Navigator>
  )
}

export default AppRoutes
