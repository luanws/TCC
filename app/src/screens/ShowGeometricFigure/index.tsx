import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { GeometricFigure, NewGeometricFigure } from '../../models/geometric-figure'
import { AppStackParamList } from '../../routes/app.routes'
import { GeometricFigureService } from '../../services/geometric-figure'
import Button from './Button'

import {
  ButtonsContainer, Container, DeleteButton, DeleteButtonText, ImageStyled,
  JSONContainer, JSONText, Scroll, Space
} from './styles'

const ShowGeometricFigure: React.FC = () => {
  const route = useRoute()
  const navigation = useNavigation()

  const [uri, setUri] = useState<string | undefined>(undefined)

  const _geometricFigure = route.params as AppStackParamList['ShowGeometricFigure']
  const [geometricFigure, setGeometricFigure] = useState<GeometricFigure>(_geometricFigure)

  useEffect(() => {
    const { filename } = geometricFigure
    GeometricFigureService.filenameToUri(filename).then(setUri)
  }, [])

  async function handleDelete() {
    await GeometricFigureService.deleteGeometricFigure(geometricFigure)
    navigation.goBack()
  }

  async function updateGeometricFigure(newGeometricFigure: NewGeometricFigure) {
    const id = geometricFigure.id
    await GeometricFigureService.updateGeometricFigure(id, newGeometricFigure)
  }

  async function handleFigurePress(newGeometricFigure: NewGeometricFigure) {
    await updateGeometricFigure(newGeometricFigure)
    setGeometricFigure({ ...geometricFigure, ...newGeometricFigure })
  }

  return (
    <Scroll>
      <Container>
        <ImageStyled source={{ uri }} />
        <Space />
        <JSONContainer>
          <JSONText>{JSON.stringify(geometricFigure, null, 4)}</JSONText>
        </JSONContainer>
        <Space />
        <ButtonsContainer>
          <Button
            selected={geometricFigure.type === 'square' && !geometricFigure.isFailed}
            image={require('../../assets/img/shapes/square.png')}
            onPress={() => handleFigurePress({ type: 'square', isFailed: false })}
          />
          <Button
            selected={geometricFigure.type === 'triangle' && !geometricFigure.isFailed}
            image={require('../../assets/img/shapes/triangle.png')}
            onPress={() => handleFigurePress({ type: 'triangle', isFailed: false })}
          />
          <Button
            selected={geometricFigure.type === 'circle' && !geometricFigure.isFailed}
            image={require('../../assets/img/shapes/circle.png')}
            onPress={() => handleFigurePress({ type: 'circle', isFailed: false })}
          />
          <Button
            selected={geometricFigure.type === 'square' && geometricFigure.isFailed}
            image={require('../../assets/img/shapes/failed-square.png')}
            onPress={() => handleFigurePress({ type: 'square', isFailed: true })}
          />
          <Button
            selected={geometricFigure.type === 'triangle' && geometricFigure.isFailed}
            image={require('../../assets/img/shapes/failed-triangle.png')}
            onPress={() => handleFigurePress({ type: 'triangle', isFailed: true })}
          />
          <Button
            selected={geometricFigure.type === 'circle' && geometricFigure.isFailed}
            image={require('../../assets/img/shapes/failed-circle.png')}
            onPress={() => handleFigurePress({ type: 'circle', isFailed: true })}
          />
        </ButtonsContainer>
        <DeleteButton activeOpacity={0.7} onPress={handleDelete}>
          <DeleteButtonText>Deletar</DeleteButtonText>
        </DeleteButton>
      </Container>
    </Scroll>
  )
}

export default ShowGeometricFigure