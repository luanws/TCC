import { BackgroundColor } from '@bacons/expo-background-color'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Migrations from './src/database/migrations'
import { DatabaseUtils } from './src/database/utils'
import AppProvider from './src/hooks'
import { useTheme } from './src/hooks/theme'
import Routes from './src/routes'

async function runOnStartup() {
  await Migrations.runMigrations()
  await DatabaseUtils.showTables()
}

function Wrapper() {
  const theme = useTheme()

  useEffect(() => { runOnStartup() }, [])

  return (
    <>
      <BackgroundColor color={theme.colors.background} />
      <StatusBar
        backgroundColor={theme.colors.statusBar.background}
        style={theme.colors.statusBar.icons}
      />
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </>
  )
}

export default function App() {
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <AppProvider>
          <Wrapper />
        </AppProvider>
      </SafeAreaView>
    </>
  )
}
