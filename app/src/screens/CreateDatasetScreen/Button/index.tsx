import React from 'react'
import { ImageSourcePropType } from 'react-native'
import { ButtonImage, Container } from './styles'

interface Props {
  onPress?(): void
  image: ImageSourcePropType
}

const Button: React.FC<Props> = (props) => {
  const { image, onPress } = props

  return (
    <Container
      activeOpacity={0.7}
      onPress={onPress}
    >
      <ButtonImage
        source={image}
        resizeMode='stretch'
      />
    </Container>
  )
}

export default Button