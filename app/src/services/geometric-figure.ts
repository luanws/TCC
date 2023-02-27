import * as MediaLibrary from 'expo-media-library'
import { GeometricFigureDAO } from '../database/dao/geometric-figures'
import { GeometricFigure, GeometricFigureWithImage } from '../models/geometric-figure'

export namespace GeometricFigureService {
    export async function saveGeometricFigure(geometricFigure: GeometricFigure, uri: string) {
        const { granted } = await MediaLibrary.requestPermissionsAsync()
        if (!granted) throw new Error('Permission to access media library is required!')
        const asset = await MediaLibrary.createAssetAsync(uri)
        const album = await MediaLibrary.getAlbumAsync('Geometric Figures')
        if (album) {
            await MediaLibrary.addAssetsToAlbumAsync([asset], album, true)
        } else {
            await MediaLibrary.createAlbumAsync('Geometric Figures', asset, true)
        }
        const filename = asset.filename
        await GeometricFigureDAO.create({ ...geometricFigure, filename })
    }

    export async function getAllGeometricFigures(): Promise<GeometricFigureWithImage[]> {
        return await GeometricFigureDAO.getAll()
    }
}