import React from 'react'
import { ImageSourcePropType } from 'react-native'
import FigureImage from '../FigureImage'
import { Container, CountContainer, CountText } from './styles'

interface Props {
  count: number
  image: ImageSourcePropType
}

const CountFigure: React.FC<Props> = (props) => {
  const { count, image } = props

  return (
    <Container>
      <FigureImage image={image} />
      <CountContainer>
        <CountText>{count}</CountText>
      </CountContainer>
    </Container>
  )
}

export default CountFigure