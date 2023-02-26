import AsyncStorage from "@react-native-async-storage/async-storage"

namespace Storage {
    export async function get<T>(key: string): Promise<T | undefined> {
        const json = await AsyncStorage.getItem(key)
        const state: T | undefined = json ? JSON.parse(json) : undefined
        if (state !== undefined) return state
        return undefined
    }

    export async function set(key: string, value: Object) {
        await AsyncStorage.setItem(key, JSON.stringify(value))
    }

    export async function remove(key: string) {
        await AsyncStorage.removeItem(key)
    }
}

export default Storage