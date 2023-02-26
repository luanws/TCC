import React from 'react'
import SwitchLabel from '../../components/SwitchLabel'
import { useSettings } from '../../hooks/settings'
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
    </Container>
  )
}

export default SettingsScreen