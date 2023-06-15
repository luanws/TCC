import axios from 'axios'

export const defaultServerAddressApi = 'https://tcc-server-en2x.onrender.com/api'

export const api = axios.create({
    baseURL: defaultServerAddressApi,
})