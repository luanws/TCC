import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Storage from '../../utils/storage'

function usePersistedState<T>(key: string, defaultState: T): [T, Dispatch<SetStateAction<T>>, boolean] {
    const [state, setState] = useState<T>(defaultState)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        Storage.get<T>(key).then(state => {
            if (state !== undefined) setState(state)
            setIsLoading(false)
        })
    }, [])

    useEffect(() => {
        if (state !== undefined && state !== null) {
            Storage.set(key, state)
        }
    }, [state])

    return [state, setState, isLoading]
}

export default usePersistedState