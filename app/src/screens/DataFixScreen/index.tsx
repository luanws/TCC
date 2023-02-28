import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { Alert } from 'react-native'
import { GeometricFigure } from '../../models/geometric-figure'
import { GeometricFigureService } from '../../services/geometric-figure'
import { Button, ButtonText, Container, Scroll } from './styles'

const DataFixScreen: React.FC = () => {
  const [geometricFigures, setGeometricFigures] = useState<GeometricFigure[]>([])

  useFocusEffect(useCallback(() => {
    GeometricFigureService.getAllGeometricFigures().then(setGeometricFigures)
  }, []))

  async function deleteDataIfImageIsNotFound() {
    const diference = await GeometricFigureService.deleteDataIfImageIsNotFound(geometricFigures)
    handleFixComplete(diference)
  }

  async function deleteImageIfDataIsNotFound() {
    const diference = await GeometricFigureService.deleteImageIfDataIsNotFound(
      geometricFigures.map(geometricFigure => geometricFigure.filename)
    )
    handleFixComplete(diference)
  }

  async function handleFixComplete(diference: number) {
    await GeometricFigureService.getAllGeometricFigures().then(setGeometricFigures)
    Alert.alert(
      'Dados corrigidos',
      `${diference} dados corrigidos`
    )
  }

  return (
    <Scroll>
      <Container>
        <Button activeOpacity={0.7} onPress={deleteDataIfImageIsNotFound}>
          <ButtonText>Apagar dados de imagens não encontradas</ButtonText>
        </Button>
        <Button activeOpacity={0.7} onPress={deleteImageIfDataIsNotFound}>
          <ButtonText>Apagar imagens de dados não encontrados</ButtonText>
        </Button>
      </Container>
    </Scroll>
  )
}

export default DataFixScreen