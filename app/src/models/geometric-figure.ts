export type GeometricFigureType = 'circle' | 'square' | 'triangle'
export interface GeometricFigure {
    type: GeometricFigureType
    isFailed: boolean
}