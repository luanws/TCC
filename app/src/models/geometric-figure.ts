export type GeometricFigureType = 'circle' | 'square' | 'triangle'
export type GeometricFigureCategory = 'circle' | 'square' | 'triangle' | 'failed-circle' | 'failed-square' | 'failed-triangle'

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

export interface GeometricFigureInfo {
    bottomDistance: number
    topDistance: number
    containsGeometricFigure: boolean
    category: GeometricFigureCategory
}