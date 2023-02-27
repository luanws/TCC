import * as MediaLibrary from 'expo-media-library'
import { GeometricFigureDAO } from '../database/dao/geometric-figures'
import { GeometricFigure, GeometricFigureWithImage } from '../models/geometric-figure'

export namespace GeometricFigureService {
    const ALBUM_NAME = 'Geometric Figures'

    async function assertMediaPermissions() {
        const { granted } = await MediaLibrary.requestPermissionsAsync()
        if (!granted) throw new Error('Permission to access media library is required!')
    }

    export async function saveGeometricFigure(geometricFigure: GeometricFigure, uri: string) {
        assertMediaPermissions()
        const asset = await MediaLibrary.createAssetAsync(uri)
        const album = await MediaLibrary.getAlbumAsync(ALBUM_NAME)
        if (album) {
            await MediaLibrary.addAssetsToAlbumAsync([asset], album, true)
        } else {
            await MediaLibrary.createAlbumAsync(ALBUM_NAME, asset, true)
        }
        const filename = asset.filename
        await GeometricFigureDAO.create({ ...geometricFigure, filename })
    }

    export async function getAllGeometricFigures(): Promise<GeometricFigureWithImage[]> {
        return await GeometricFigureDAO.getAll()
    }

    export async function filenameToUri(filename: string): Promise<string> {
        assertMediaPermissions()
        const album = await MediaLibrary.getAlbumAsync(ALBUM_NAME)
        const { assets } = await MediaLibrary.getAssetsAsync({ album })
        const asset = assets.find(asset => asset.filename === filename)
        if (!asset) throw new Error('Asset not found!')
        return asset.uri
    }

    export function getImageFromGeometricFigure(geometricFigure: GeometricFigure) {
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
}