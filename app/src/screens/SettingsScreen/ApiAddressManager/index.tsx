import React, { useState } from 'react'
import { useSettings } from '../../../hooks/settings'
import { useTheme } from '../../../hooks/theme'
import { defaultServerAddressApi } from '../../../utils/api'
import { Container, TextInputStyled } from './styles'

interface Props {
}

const ApiAddressManager: React.FC<Props> = (props) => {
  const { apiAddress, setApiAddress } = useSettings()
  const theme = useTheme()

  const [isFocused, setIsFocused] = useState(false)

  return (
    <Container>
      <TextInputStyled
        placeholder={defaultServerAddressApi}
        placeholderTextColor={theme.colors.unfocused}
        value={apiAddress}
        onChangeText={setApiAddress}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        isFocused={isFocused}
      />
    </Container>
  )
}

export default ApiAddressManager