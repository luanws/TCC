import * as MediaLibrary from 'expo-media-library'
import { GeometricFigureDAO } from '../database/dao/geometric-figures'
import { GeometricFigure, NewGeometricFigure } from '../models/geometric-figure'

export namespace GeometricFigureService {
    const ALBUM_NAME = 'Geometric Figures'

    async function assertMediaPermissions() {
        const { granted } = await MediaLibrary.requestPermissionsAsync()
        if (!granted) throw new Error('Permission to access media library is required!')
    }

    export async function saveGeometricFigure(newGeometricFigure: NewGeometricFigure, uri: string) {
        assertMediaPermissions()
        const asset = await MediaLibrary.createAssetAsync(uri)
        const album = await MediaLibrary.getAlbumAsync(ALBUM_NAME)
        if (album) {
            await MediaLibrary.addAssetsToAlbumAsync([asset], album, true)
        } else {
            await MediaLibrary.createAlbumAsync(ALBUM_NAME, asset, true)
        }
        const filename = asset.filename
        await GeometricFigureDAO.create(newGeometricFigure, filename)
    }

    export async function getAllGeometricFigures(): Promise<GeometricFigure[]> {
        return await GeometricFigureDAO.getAll()
    }

    export async function filenameToUri(filename: string): Promise<string> {
        const asset = await getAsset(filename)
        if (!asset) throw new Error('Asset not found!')
        return asset.uri
    }

    export function getImageFromGeometricFigure(geometricFigure: NewGeometricFigure) {
        if (geometricFigure.isFailed) {
            switch (geometricFigure.type) {
                case 'circle':
                    return require('../assets/img/shapes/failed-circle.png')
                case 'square':
                    return require('../assets/img/shapes/failed-square.png')
                case 'triangle':
                    return require('../assets/img/shapes/failed-triangle.png')
            }
        } else {
            switch (geometricFigure.type) {
                case 'circle':
                    return require('../assets/img/shapes/circle.png')
                case 'square':
                    return require('../assets/img/shapes/square.png')
                case 'triangle':
                    return require('../assets/img/shapes/triangle.png')
            }
        }
    }

    export async function deleteGeometricFigure(geometricFigure: GeometricFigure) {
        await deleteGeometricFigureImageFile(geometricFigure.filename)
        await GeometricFigureDAO.deleteGeometricFigure(geometricFigure.id)
    }

    export async function deleteGeometricFigureImageFile(filename: string) {
        assertMediaPermissions()
        const album = await MediaLibrary.getAlbumAsync(ALBUM_NAME)
        const { assets } = await MediaLibrary.getAssetsAsync({ album })
        const asset = assets.find(asset => asset.filename === filename)
        if (!asset) throw new Error('Asset not found!')
        await MediaLibrary.deleteAssetsAsync([asset])
    }

    async function getAsset(filename: string): Promise<MediaLibrary.Asset | undefined> {
        assertMediaPermissions()
        const album = await MediaLibrary.getAlbumAsync(ALBUM_NAME)
        const { assets } = await MediaLibrary.getAssetsAsync({ album })
        const asset = assets.find(asset => asset.filename === filename)
        return asset
    }

    export async function deleteDataIfImageIsNotFound(geometricFigure: GeometricFigure): Promise<boolean> {
        const asset = await getAsset(geometricFigure.filename)
        if (!asset) {
            await GeometricFigureDAO.deleteGeometricFigure(geometricFigure.id)
            return true
        }
        return false
    }

    export async function deleteImageIfDataIsNotFound(filename: string): Promise<boolean> {
        assertMediaPermissions()
        const geometricFigure = await GeometricFigureDAO.getGeometricFigureByFilename(filename)
        if (!geometricFigure) {
            await deleteGeometricFigureImageFile(filename)
            return true
        }
        return false
    }
}