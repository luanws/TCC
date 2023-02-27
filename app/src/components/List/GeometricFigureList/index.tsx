import React from 'react'
import { FlatList } from 'react-native'
import { GeometricFigure } from '../../../models/geometric-figure'
import GeometricFigureCell from '../../Cell/GeometricFigureCell'

interface Props {
  geometricFigures: GeometricFigure[]
  onPress?(geometricFigure: GeometricFigure): void
}

const GeometricFigureList: React.FC<Props> = (props) => {
  const { geometricFigures, onPress } = props

  const renderItem = (geometricFigure: GeometricFigure, index: number) => (
    <GeometricFigureCell
      key={geometricFigure.filename}
      geometricFigure={geometricFigure}
      onPress={onPress}
    />
  )

  return (
    <FlatList
      data={geometricFigures}
      keyExtractor={geometricFigure => geometricFigure.filename.toString()}
      renderItem={props => renderItem(props.item, props.index)}
    />
  )
}

export default GeometricFigureList