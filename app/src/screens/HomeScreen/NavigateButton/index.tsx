import React from 'react'
import Icon from '../../../components/Icon'
import { useTheme } from '../../../hooks/theme'
import { Button, Container, TitleText } from './styles'

interface Props {
  icon: string
  title: string
  onPress?(): void
}

const NavigateButton: React.FC<Props> = (props) => {
  const { icon, title, onPress } = props

  const theme = useTheme()

  return (
    <Container>
      <Button
        activeOpacity={0.7}
        onPress={onPress}
      >
        <Icon
          icon={icon}
          size={32}
          color={theme.colors.icon}
        />
        <TitleText>{title}</TitleText>
      </Button>
    </Container>
  )
}

export default NavigateButton