import React from 'react'
import { ImageSourcePropType } from 'react-native'
import { ButtonImage, Container } from './styles'

interface Props {
  image: ImageSourcePropType
}

const FigureImage: React.FC<Props> = (props) => {
  const { image } = props

  return (
    <Container>
      <ButtonImage
        source={image}
        resizeMode='stretch'
      />
    </Container>
  )
}

export default FigureImage