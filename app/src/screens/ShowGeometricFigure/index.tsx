import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { AppStackParamList } from '../../routes/app.routes'
import { GeometricFigureService } from '../../services/geometric-figure'

import { Container, DeleteButton, DeleteButtonText, ImageStyled, JSONContainer, JSONText, Scroll, Space } from './styles'

const ShowGeometricFigure: React.FC = () => {
  const route = useRoute()
  const navigation = useNavigation()

  const [uri, setUri] = useState<string | undefined>(undefined)

  const geometricFigure = route.params as AppStackParamList['ShowGeometricFigure']
  const { filename } = geometricFigure
  const json = JSON.stringify(geometricFigure, null, 4)

  useEffect(() => {
    GeometricFigureService.filenameToUri(filename).then(setUri)
  }, [])

  async function handleDelete() {
    await GeometricFigureService.deleteGeometricFigure(geometricFigure)
    navigation.goBack()
  }

  return (
    <Scroll>
      <Container>
        <ImageStyled source={{ uri }} />
        <Space />
        <JSONContainer>
          <JSONText>{json}</JSONText>
        </JSONContainer>
        <Space />
        <DeleteButton activeOpacity={0.7} onPress={handleDelete}>
          <DeleteButtonText>Deletar</DeleteButtonText>
        </DeleteButton>
      </Container>
    </Scroll>
  )
}

export default ShowGeometricFigure