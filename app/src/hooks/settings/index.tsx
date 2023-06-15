import React, { createContext, PropsWithChildren, useContext, useEffect } from 'react'
import { ThemeTypes } from '../../theme/theme.model'
import { api, defaultServerAddressApi } from '../../utils/api'
import usePersistedState from "../persisted-state"

interface SettingsContextData {
  theme: ThemeTypes
  setTheme(theme: ThemeTypes): void
  isThemeLoading: boolean
  apiAddress: string
  setApiAddress(apiAddress: string): void
  apiAddressLoading: boolean
}

const SettingsContext = createContext({} as SettingsContextData)

export function SettingsProvider({ children }: PropsWithChildren<{}>) {
  const [theme, setTheme, isThemeLoading] = usePersistedState<ThemeTypes>('theme', 'light')
  const [apiAddress, setApiAddress, apiAddressLoading] = usePersistedState<string>('apiAddress', '')

  useEffect(() => {
    const newApiAddress = apiAddress || defaultServerAddressApi
    console.log(`apiAddress: ${newApiAddress}`)
    api.defaults.baseURL = newApiAddress
  }, [apiAddress])

  return (
    <SettingsContext.Provider value={{
      theme, setTheme, isThemeLoading,
      apiAddress, setApiAddress, apiAddressLoading
    }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  return useContext(SettingsContext)
}