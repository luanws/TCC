import * as MediaLibrary from 'expo-media-library'

export namespace Assets {
    export async function assertMediaPermissions() {
        const { granted } = await MediaLibrary.requestPermissionsAsync()
        if (!granted) throw new Error('Permission to access media library is required!')
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

    export async function getAlbum(albumName: string): Promise<MediaLibrary.Album> {
        assertMediaPermissions()
        let album = await MediaLibrary.getAlbumAsync(albumName)
        if (!album) {
            await MediaLibrary.createAlbumAsync(albumName, undefined, false)
            album = await MediaLibrary.getAlbumAsync(albumName)
        }
        return album
    }

    export async function createAssetFromUri(albumName: string, uri: string): Promise<MediaLibrary.Asset> {
        assertMediaPermissions()
        const album = await getAlbum(albumName)
        const asset = await MediaLibrary.createAssetAsync(uri)
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, true)
        return asset
    }

    export async function deleteAssetByFilename(albumName: string, filename: string) {
        assertMediaPermissions()
        const asset = await getAssetByFilename(albumName, filename)
        if (!asset) throw new Error('Asset not found!')
        await MediaLibrary.deleteAssetsAsync([asset])
    }
}