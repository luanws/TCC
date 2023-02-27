import { NavigationProp, useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import GeometricFigureList from '../../components/List/GeometricFigureList'
import { GeometricFigureWithImage } from '../../models/geometric-figure'
import { AppStackParamList } from '../../routes/app.routes'
import { GeometricFigureService } from '../../services/geometric-figure'
import { Container } from './styles'

const ShowDatasetScreen: React.FC = () => {
  const [geometricFigures, setGeometricFigures] = useState<GeometricFigureWithImage[]>([])

  const navigation = useNavigation<NavigationProp<AppStackParamList>>()

  useEffect(() => {
    GeometricFigureService.getAllGeometricFigures().then(setGeometricFigures)
  }, [])

  function handleGeometricFigurePress(geometricFigure: GeometricFigureWithImage) {
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