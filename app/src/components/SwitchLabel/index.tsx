import React from 'react'
import { Switch as SwitchReactNative } from 'react-native'
import { useTheme } from '../../hooks/theme'
import { Container, LabelText } from './styles'

interface Props {
  value?: boolean
  onChange: (isEnabled: boolean) => void
  label: string
  labelDisabled?: string
}

const SwitchLabel: React.FC<Props> = (props) => {
  const { value, label, onChange, labelDisabled } = props

  const theme = useTheme()

  return (
    <Container>
      <LabelText enabled={!!value}>
        {value ? label : labelDisabled || label}
      </LabelText>
      <SwitchReactNative
        value={value}
        onValueChange={onChange}
        trackColor={{
          true: theme.colors.accentDark,
          false: "#aeaeae"
        }}
        thumbColor={value ? theme.colors.accentLight : "#f4f3f4"}
      />
    </Container>
  )
}

export default SwitchLabel