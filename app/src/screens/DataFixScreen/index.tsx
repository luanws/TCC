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
    const updatedGeometricFigures = []
    for (let geometricFigure of geometricFigures) {
      const deleted = await GeometricFigureService.deleteDataIfImageIsNotFound(geometricFigure)
      if (!deleted) updatedGeometricFigures.push(geometricFigure)
    }
    handleFixComplete(geometricFigures, updatedGeometricFigures)
  }

  async function deleteImageIfDataIsNotFound() {
    const updatedGeometricFigures = []
    for (let geometricFigure of geometricFigures) {
      const deleted = await GeometricFigureService.deleteImageIfDataIsNotFound(geometricFigure.filename)
      if (!deleted) updatedGeometricFigures.push(geometricFigure)
    }
    handleFixComplete(geometricFigures, updatedGeometricFigures)
  }

  async function handleFixComplete(oldGeometricFigures: GeometricFigure[], updatedGeometricFigures: GeometricFigure[]) {
    await GeometricFigureService.getAllGeometricFigures().then(setGeometricFigures)
    setGeometricFigures(updatedGeometricFigures)
    Alert.alert(
      'Dados corrigidos',
      `${oldGeometricFigures.length - updatedGeometricFigures.length} dados corrigidos`
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