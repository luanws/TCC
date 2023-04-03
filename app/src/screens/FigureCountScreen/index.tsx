import React, { useEffect, useState } from 'react'
import { GeometricFigure } from '../../models/geometric-figure'
import { GeometricFigureService } from '../../services/geometric-figure'
import CountFigure from './CountFigure'
import { Container, Scroll, TotalCountContainer, TotalCountText } from './styles'

const FigureCountScreen: React.FC = (props) => {
  const [allGeometricFigures, setAllGeometricFigures] = useState<GeometricFigure[]>([])

  const squareCount = count('square', false)
  const triangleCount = count('triangle', false)
  const circleCount = count('circle', false)
  const failedSquareCount = count('square', true)
  const failedTriangleCount = count('triangle', true)
  const failedCircleCount = count('circle', true)

  useEffect(() => {
    GeometricFigureService.getAllGeometricFigures().then(setAllGeometricFigures)
  }, [])

  function count(type: 'square' | 'triangle' | 'circle', isFailed: boolean): number {
    return allGeometricFigures.filter(
      geometricFigure => geometricFigure.type === type && geometricFigure.isFailed === isFailed
    ).length
  }

  return (
    <Scroll>
      <Container>
        <TotalCountContainer>
          <TotalCountText>
            {allGeometricFigures.length} figuras geométricas
          </TotalCountText>
        </TotalCountContainer>
        <CountFigure
          image={require('../../assets/img/shapes/square.png')}
          count={squareCount}
        />
        <CountFigure
          image={require('../../assets/img/shapes/triangle.png')}
          count={triangleCount}
        />
        <CountFigure
          image={require('../../assets/img/shapes/circle.png')}
          count={circleCount}
        />
        <CountFigure
          image={require('../../assets/img/shapes/failed-square.png')}
          count={failedSquareCount}
        />
        <CountFigure
          image={require('../../assets/img/shapes/failed-triangle.png')}
          count={failedTriangleCount}
        />
        <CountFigure
          image={require('../../assets/img/shapes/failed-circle.png')}
          count={failedCircleCount}
        />
      </Container>
    </Scroll>
  )
}

export default FigureCountScreen