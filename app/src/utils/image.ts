import * as ImageManipulator from 'expo-image-manipulator'

export namespace ImageUtils {
    export async function resizeImage(imageUri: string, width: number, height: number): Promise<string> {
        const image = await ImageManipulator.manipulateAsync(
            imageUri,
            [{ resize: { width, height } }],
            { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
        )
        return image.base64!
    }
}