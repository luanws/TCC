import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import GeometricFigureList from '../../components/List/GeometricFigureList'
import { GeometricFigure } from '../../models/geometric-figure'
import { AppStackParamList } from '../../routes/app.routes'
import { GeometricFigureService } from '../../services/geometric-figure'
import { Container } from './styles'

const ShowDatasetScreen: React.FC = () => {
  const [geometricFigures, setGeometricFigures] = useState<GeometricFigure[]>([])

  const navigation = useNavigation<NavigationProp<AppStackParamList>>()

  useFocusEffect(useCallback(() => {
    GeometricFigureService.getAllGeometricFigures().then(setGeometricFigures)
    deleteGeometricFiguresIfImageIsNotFound()
    deleteImageIfDataIsNotFound()
  }, []))

  async function deleteGeometricFiguresIfImageIsNotFound() {
    const updatedGeometricFigures = []
    for (let geometricFigure of geometricFigures) {
      const deleted = await GeometricFigureService.deleteDataIfImageIsNotFound(geometricFigure)
      if (!deleted) updatedGeometricFigures.push(geometricFigure)
    }
    if (updatedGeometricFigures.length !== geometricFigures.length) {
      setGeometricFigures(updatedGeometricFigures)
    }
  }

  async function deleteImageIfDataIsNotFound() {
    const updatedGeometricFigures = []
    for (let geometricFigure of geometricFigures) {
      const deleted = await GeometricFigureService.deleteImageIfDataIsNotFound(geometricFigure.filename)
      if (!deleted) updatedGeometricFigures.push(geometricFigure)
    }
    if (updatedGeometricFigures.length !== geometricFigures.length) {
      setGeometricFigures(updatedGeometricFigures)
    }
  }

  function handleGeometricFigurePress(geometricFigure: GeometricFigure) {
    navigation.navigate('ShowGeometricFigure', geometricFigure)
  }

  return (
    <Container>
      <GeometricFigureList
        geometricFigures={geometricFigures}
        onPress={handleGeometricFigurePress}
      />
    </Container>
  )
}

export default ShowDatasetScreen