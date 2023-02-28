import { GeometricFigureDAO } from '../database/dao/geometric-figures'
import { GeometricFigure, NewGeometricFigure } from '../models/geometric-figure'
import { Assets } from '../utils/assets'

export namespace GeometricFigureService {
    const ALBUM_NAME = 'Geometric Figures'

    export async function saveGeometricFigure(newGeometricFigure: NewGeometricFigure, uri: string) {
        const { filename } = await Assets.createAssetFromUri(ALBUM_NAME, uri)
        await GeometricFigureDAO.create(newGeometricFigure, filename)
    }

    export async function getAllGeometricFigures(): Promise<GeometricFigure[]> {
        return await GeometricFigureDAO.getAll()
    }

    export async function filenameToUri(filename: string): Promise<string> {
        return Assets.filenameToUri(ALBUM_NAME, filename)
    }

    export function getImageFromGeometricFigure(geometricFigure: NewGeometricFigure) {
        const { isFailed, type } = geometricFigure
        const isFailedDict = {
            'circle': require('../assets/img/shapes/failed-circle.png'),
            'square': require('../assets/img/shapes/failed-square.png'),
            'triangle': require('../assets/img/shapes/failed-triangle.png')
        }
        const isNotFailedDict = {
            'circle': require('../assets/img/shapes/circle.png'),
            'square': require('../assets/img/shapes/square.png'),
            'triangle': require('../assets/img/shapes/triangle.png')
        }
        return isFailed ? isFailedDict[type] : isNotFailedDict[type]
    }

    export async function deleteGeometricFigure(geometricFigure: GeometricFigure) {
        await Assets.deleteAssetByFilename(ALBUM_NAME, geometricFigure.filename)
        await GeometricFigureDAO.deleteGeometricFigure(geometricFigure.id)
    }

    export async function deleteDataIfImageIsNotFound(geometricFigure: GeometricFigure): Promise<boolean> {
        const asset = await Assets.getAssetByFilename(ALBUM_NAME, geometricFigure.filename)
        if (!asset) {
            await GeometricFigureDAO.deleteGeometricFigure(geometricFigure.id)
            return true
        }
        return false
    }

    export async function deleteImageIfDataIsNotFound(filename: string): Promise<boolean> {
        const geometricFigure = await GeometricFigureDAO.getGeometricFigureByFilename(filename)
        if (!geometricFigure) {
            await Assets.deleteAssetByFilename(ALBUM_NAME, filename)
            return true
        }
        return false
    }
}