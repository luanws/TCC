import axios from 'axios'

export const serverAddressApi = 'http://192.168.100.115:5000/api'

export const api = axios.create({
    baseURL: serverAddressApi,
})