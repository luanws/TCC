import * as MediaLibrary from 'expo-media-library'

export namespace Assets {
    export async function assertMediaPermissions() {
        const { granted } = await MediaLibrary.requestPermissionsAsync()
        if (!granted) throw new Error('Permission to access media library is required!')
    }

    export async function getAssets(albumName: string): Promise<MediaLibrary.Asset[]> {
        assertMediaPermissions()
        const album = await MediaLibrary.getAlbumAsync(albumName)
        const { assets } = await MediaLibrary.getAssetsAsync({ album })
        return assets
    }

    export async function getAssetsByFilenames(albumName: string, filenames: string[]): Promise<MediaLibrary.Asset[]> {
        assertMediaPermissions()
        const album = await MediaLibrary.getAlbumAsync(albumName)
        const { assets } = await MediaLibrary.getAssetsAsync({ album })
        const assetsByFilenames = assets.filter(asset => filenames.includes(asset.filename))
        return assetsByFilenames
    }

    export async function getAssetByFilename(albumName: string, filename: string): Promise<MediaLibrary.Asset | undefined> {
        assertMediaPermissions()
        const album = await MediaLibrary.getAlbumAsync(albumName)
        const { assets } = await MediaLibrary.getAssetsAsync({ album })
        const asset = assets.find(asset => asset.filename === filename)
        return asset
    }

    export async function filenameToUri(albumName: string, filename: string): Promise<string> {
        assertMediaPermissions()
        const asset = await getAssetByFilename(albumName, filename)
        if (!asset) throw new Error('Asset not found!')
        return asset.uri
    }

    export async function createAssetFromUri(albumName: string, uri: string): Promise<MediaLibrary.Asset> {
        assertMediaPermissions()
        const asset = await MediaLibrary.createAssetAsync(uri)
        const album = await MediaLibrary.getAlbumAsync(albumName)
        if (album) await MediaLibrary.addAssetsToAlbumAsync([asset], album, true)
        else await MediaLibrary.createAlbumAsync(albumName, asset, false)
        return asset
    }

    export async function deleteAssetByFilename(albumName: string, filename: string) {
        assertMediaPermissions()
        const asset = await getAssetByFilename(albumName, filename)
        if (!asset) throw new Error('Asset not found!')
        await MediaLibrary.deleteAssetsAsync([asset])
    }

    export async function deleteAssets(assets: MediaLibrary.Asset[]) {
        assertMediaPermissions()
        await MediaLibrary.deleteAssetsAsync(assets)
    }
}