export type GeometricFigureType = 'circle' | 'square' | 'triangle'

export interface GeometricFigure {
    id: number
    type: GeometricFigureType
    isFailed: boolean
    filename: string
}

export interface NewGeometricFigure {
    type: GeometricFigureType
    isFailed: boolean
}