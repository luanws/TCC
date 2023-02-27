import React, { useEffect, useState } from 'react'
import GeometricFigureCell from '../../components/Cell/GeometricFigureCell'
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
      {geometricFigures.map((geometricFigure) => (
        <GeometricFigureCell key={geometricFigure.filename} geometricFigure={geometricFigure} />
      ))}
    </Container>
  )
}

export default ShowDatasetScreen