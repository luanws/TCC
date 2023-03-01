import { getDatabase, ref, set } from 'firebase/database'
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

    export async function deleteDataIfImageIsNotFound(geometricFigures: GeometricFigure[]): Promise<number> {
        const allAssets = await Assets.getAssets(ALBUM_NAME)
        const extraGeometricFigures = geometricFigures.filter(geoFigure => {
            return !allAssets.find(asset => asset.filename === geoFigure.filename)
        })
        await GeometricFigureDAO.deleteGeometricFigures(extraGeometricFigures.map(geoFigure => geoFigure.id))
        const diference = extraGeometricFigures.length
        return diference
    }

    export async function deleteImageIfDataIsNotFound(filenames: string[]): Promise<number> {
        const allAssets = await Assets.getAssets(ALBUM_NAME)
        const assets = await Assets.getAssetsByFilenames(ALBUM_NAME, filenames)
        const assetsFilenames = assets.map(asset => asset.filename)
        const extraAssets = allAssets.filter(asset => !assetsFilenames.includes(asset.filename))
        await Assets.deleteAssets(extraAssets)
        const diference = extraAssets.length
        return diference
    }

    export async function saveBackupInFirebaseRealtimeDatabase() {
        const geometricFigures = await GeometricFigureDAO.getAll()
        const db = getDatabase()
        const backupName = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
        const geometricFiguresBackupRef = ref(db, `geometricFiguresBackup/${backupName}`)
        await set(geometricFiguresBackupRef, geometricFigures)
    }
}