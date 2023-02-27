export type GeometricFigureType = 'circle' | 'square' | 'triangle'
export interface GeometricFigure {
    type: GeometricFigureType
    isFailed: boolean
}

export interface GeometricFigureWithImage extends GeometricFigure {
    filename: string
}