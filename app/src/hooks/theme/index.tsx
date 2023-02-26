import React, { PropsWithChildren } from 'react'
import { Theme } from '../../utils/theme/theme.model'
import baseStyled, {
  ThemeProvider as ThemeProviderStyledComponents,
  ThemedStyledInterface,
  useTheme as useThemeStyledComponents
} from 'styled-components'
import { themes } from '../../utils/theme/themes'
import { useSettings } from '../settings'

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { theme } = useSettings()

  return (
    <ThemeProviderStyledComponents theme={themes[theme]}>
      {children}
    </ThemeProviderStyledComponents>
  )
}

export const styled = baseStyled as ThemedStyledInterface<Theme>

export const useTheme = useThemeStyledComponents as () => Theme