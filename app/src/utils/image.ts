import * as ImageManipulator from 'expo-image-manipulator'

export namespace ImageUtils {
    export async function resizeImage(uri: string, width: number, height: number) {
        const resizedImage = await ImageManipulator.manipulateAsync(
            uri,
            [{ resize: { width, height } }],
            { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
        )
        return resizedImage
    }
}