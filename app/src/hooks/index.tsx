import React, { PropsWithChildren } from 'react'
import { SettingsProvider } from './settings'
import { ThemeProvider } from './theme'

const AppProvider: React.FC<PropsWithChildren> = ({ children }) => (
  <SettingsProvider>
    <ThemeProvider>
      {children}
    </ThemeProvider>
  </SettingsProvider>
)

export default AppProvider
