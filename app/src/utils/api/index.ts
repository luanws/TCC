import axios from 'axios'

const serverAddressApiDev = 'http://192.168.100.115:5000/api'
const serverAddressApiProd = 'https://tcc-server-en2x.onrender.com/api'
export const serverAddressApi = serverAddressApiProd

export const api = axios.create({
    baseURL: serverAddressApi,
})