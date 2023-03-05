import React from 'react'
import { ImageSourcePropType } from 'react-native'
import { ButtonImage, Container } from './styles'

interface Props {
  onPress?(): void
  image: ImageSourcePropType
  selected?: boolean
}

const Button: React.FC<Props> = (props) => {
  const { image, onPress, selected } = props

  return (
    <Container
      selected={!!selected}
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