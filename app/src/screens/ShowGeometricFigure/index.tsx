import { useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { AppStackParamList } from '../../routes/app.routes'
import { GeometricFigureService } from '../../services/geometric-figure'

import { Container, ImageStyled, JSONContainer, JSONText, Scroll, Space } from './styles'

const ShowGeometricFigure: React.FC = () => {
  const route = useRoute()

  const [uri, setUri] = useState<string | undefined>(undefined)

  const geometricFigureWithImage = route.params as AppStackParamList['ShowGeometricFigure']
  const geometricFigure = { ...geometricFigureWithImage, filename: undefined }
  const { filename } = geometricFigureWithImage
  const json = JSON.stringify(geometricFigure, null, 4)

  useEffect(() => {
    GeometricFigureService.filenameToUri(filename).then(setUri)
  }, [])

  return (
    <Scroll>
      <Container>
        <ImageStyled source={{ uri }} />
        <Space />
        <JSONContainer>
          <JSONText>{json}</JSONText>
        </JSONContainer>
      </Container>
    </Scroll>
  )
}

export default ShowGeometricFigure