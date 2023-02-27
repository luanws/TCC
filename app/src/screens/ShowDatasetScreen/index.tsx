import React, { useEffect, useState } from 'react'
import GeometricFigureList from '../../components/List/GeometricFigureList'
import { GeometricFigureWithImage } from '../../models/geometric-figure'
import { GeometricFigureService } from '../../services/geometric-figure'
import { Container } from './styles'

const ShowDatasetScreen: React.FC = () => {
  const [geometricFigures, setGeometricFigures] = useState<GeometricFigureWithImage[]>([])

  useEffect(() => {
    GeometricFigureService.getAllGeometricFigures().then(setGeometricFigures)
  }, [])

  return (
    <Container>
      <GeometricFigureList
        geometricFigures={geometricFigures}
      />
    </Container>
  )
}

export default ShowDatasetScreen