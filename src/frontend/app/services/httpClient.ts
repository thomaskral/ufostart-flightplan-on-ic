import axios from 'axios'
import { log } from '@/app/services/errorService'

const httpClient = axios.create({
  baseURL: '/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    // @todo Handle caching
    'Cache-Control': 'no-cache',
  },
})

const errorInterceptor = (error) => {
  if (!error.response) {
    log('Network/Server error')
    return Promise.reject(error)
  }

  log(error)
  return Promise.reject(error)
}

const responseInterceptor = (response) => response

httpClient.interceptors.response.use(responseInterceptor, errorInterceptor)

export default httpClient
