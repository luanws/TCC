import React from 'react'
import SwitchLabel from '../../components/SwitchLabel'
import { useSettings } from '../../hooks/settings'
import ApiAddressManager from './ApiAddressManager'
import { Container } from './styles'

const SettingsScreen: React.FC = () => {
  const { theme, setTheme } = useSettings()

  return (
    <Container>
      <SwitchLabel
        label="Tema escuro"
        value={theme == 'dark'}
        onChange={isDark => setTheme(isDark ? 'dark' : 'light')}
      />
      <ApiAddressManager />
    </Container>
  )
}

export default SettingsScreen