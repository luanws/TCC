import * as firebaseDatabase from 'firebase/database'
import { GeometricFigureDAO } from '../database/dao/geometric-figures'
import { GeometricFigure, GeometricFigureInfo, GeometricFigureType, NewGeometricFigure } from '../models/geometric-figure'
import { api } from '../utils/api'
import { Assets } from '../utils/assets'

export namespace GeometricFigureService {
    const ALBUM_NAME = 'Geometric Figures'

    export async function predictImage(imageURI: string): Promise<GeometricFigureType> {
        const now = new Date().toISOString()
            .replace(/T/, ' ')
            .replace(/\..+/, '')
            .replace(/:/g, '-')

        const formData = new FormData()
        formData.append('image', { uri: imageURI, type: 'image/jpeg', name: `${now}.jpg` } as any)

        const { data } = await api.post('/geometric_figures/classifier', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        })

        const { category } = data as { category: GeometricFigureType }
        return category
    }

    export async function getGeometricFigureInfo(uri: string): Promise<GeometricFigureInfo> {
        const now = new Date().toISOString()
            .replace(/T/, ' ')
            .replace(/\..+/, '')
            .replace(/:/g, '-')
        const formData = new FormData()
        formData.append('image', { uri, type: 'image/jpeg', name: `${now}.jpg` } as any)

        const { data } = await api.post('/geometric_figures/info', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        })
        const geometricFigureInfo: GeometricFigureInfo = {
            bottomDistance: data.bottom_distance,
            topDistance: data.top_distance,
            containsGeometricFigure: data.contains_geometric_figure,
            category: data.category
        }
        return geometricFigureInfo
    }

    export async function createGeometricFigure(newGeometricFigure: NewGeometricFigure, uri: string) {
        const { filename } = await Assets.createAssetFromUri(ALBUM_NAME, uri)
        await GeometricFigureDAO.create(newGeometricFigure, filename)
    }

    export async function updateGeometricFigure(geometricFigureId: number, newGeometricFigure: NewGeometricFigure) {
        await GeometricFigureDAO.update(geometricFigureId, newGeometricFigure)
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

    export async function saveBackupInFirebaseRTDB() {
        const geometricFigures = await GeometricFigureDAO.getAll()
        const db = firebaseDatabase.getDatabase()
        const backupName = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
        const geometricFiguresBackupRef = firebaseDatabase.ref(db, `geometricFiguresBackup/${backupName}`)
        await firebaseDatabase.set(geometricFiguresBackupRef, geometricFigures)
    }

    export async function getLastBackupName() {
        const db = firebaseDatabase.getDatabase()
        const geometricFiguresBackupRef = firebaseDatabase.ref(db, `geometricFiguresBackup`)
        const geometricFiguresBackup = await firebaseDatabase.get(geometricFiguresBackupRef)
        const backupNames = Object.keys(geometricFiguresBackup.val())
        return backupNames[backupNames.length - 1]
    }

    export async function restoreBackupFromFirebaseRTDB(backupName: string) {
        const db = firebaseDatabase.getDatabase()
        const geometricFiguresBackupRef = firebaseDatabase.ref(db, `geometricFiguresBackup/${backupName}`)
        const geometricFigures = await firebaseDatabase.get(geometricFiguresBackupRef)
        await GeometricFigureDAO.deleteAllGeometricFigures()
        await GeometricFigureDAO.createMany(geometricFigures.val())
    }
}