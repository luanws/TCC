import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { useTheme } from '../hooks/theme'
import CreateDatasetScreen from '../screens/CreateDatasetScreen'
import HomeScreen from '../screens/HomeScreen'
import SettingsScreen from '../screens/SettingsScreen'

export type AppStackParamList = {
  Home: undefined
  Settings: undefined
  CreateDataset: undefined
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
      <App.Screen component={SettingsScreen} name="Settings" options={{ title: 'Configurações' }} />
      <App.Screen component={CreateDatasetScreen} name="CreateDataset" options={{ title: 'Criação do dataset' }} />
    </App.Navigator>
  )
}

export default AppRoutes
