import React, { memo, useEffect, useState } from 'react'
import { GeometricFigure } from '../../../models/geometric-figure'
import { GeometricFigureService } from '../../../services/geometric-figure'
import { CategoryImage, Container, ImageStyled, Space } from './styles'

interface Props {
  geometricFigure: GeometricFigure
  onPress?(geometricFigure: GeometricFigure): void
}

const GeometricFigureCell: React.FC<Props> = (props) => {
  const { geometricFigure, onPress } = props
  const { filename } = geometricFigure

  const [uri, setUri] = useState<string | undefined>(undefined)

  useEffect(() => {
    GeometricFigureService.filenameToUri(filename).then(setUri)
  }, [])

  return (
    <Container
      activeOpacity={0.7}
      onPress={() => onPress && onPress(geometricFigure)}
    >
      {uri && <ImageStyled source={{ uri }} />}
      <Space />
      <CategoryImage
        resizeMode='stretch'
        source={GeometricFigureService.getImageFromGeometricFigure(geometricFigure)}
      />
    </Container>
  )
}

export default memo(GeometricFigureCell)