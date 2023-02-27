import React from 'react'
import { ButtonIcon, Container } from './styles'

interface Props {
  icon: string
  onPress?(): void
}

const Button: React.FC<Props> = (props) => {
  const { icon, onPress } = props

  return (
    <Container
      activeOpacity={0.7}
      onPress={onPress}
    >
      <ButtonIcon icon={icon} size={32} />
    </Container>
  )
}

export default Button