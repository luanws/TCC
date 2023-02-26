import React from 'react'
import Icon from '../Icon'
import { Button, Container } from './styles'

interface Props {
  icon: string
  iconColor?: string
  buttonColor?: string
  size?: number
  onPress?(): void
  position: 'left' | 'right' | 'center'
  margin?: number
}

const FloatActionButton: React.FC<Props> = (props) => {
  const { size, icon, iconColor, buttonColor, onPress, position, margin } = props

  return (
    <Container
      position={position}
      size={size}
      margin={margin}
    >
      <Button
        activeOpacity={0.7}
        size={size}
        backgroundColor={buttonColor}
        onPress={() => onPress && onPress()}
      >
        <Icon icon={icon} color={iconColor || 'white'} />
      </Button>
    </Container>
  )
}

export default FloatActionButton