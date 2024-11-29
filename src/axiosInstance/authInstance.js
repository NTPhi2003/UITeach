import axios from 'axios'
import { X_API_KEY } from '../constant/key'
import { notAuthInstance } from './notAuthInstance'
import { REFRESH_TOKEN_API_URL } from '../constant/api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  USER_ID,
  USER_INFO,
} from '../constant/nameOfKey'
const authInstance = axios.create({
  headers: {
    'x-api-key': X_API_KEY,
  },
})
authInstance.interceptors.request.use(
  async (config) => {
    config.headers.authorization = await AsyncStorage.getItem(ACCESS_TOKEN)
    config.headers['x-client-id'] = await AsyncStorage.getItem(USER_ID)
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

function createAxiosResponseInterceptor() {
  const interceptor = authInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response.status !== 401) {
        return Promise.reject(error)
      }

      authInstance.interceptors.response.eject(interceptor)

      return authInstance
        .post(
          REFRESH_TOKEN_API_URL,
          {},
          {
            headers: {
              'refresh-token': await AsyncStorage.getItem(REFRESH_TOKEN),
            },
          },
        )
        .then(async (response) => {
          try {
            await AsyncStorage.setItem(
              ACCESS_TOKEN,
              response.data.metadata.accessToken,
            )
            await AsyncStorage.setItem(
              REFRESH_TOKEN,
              response.data.metadata.refreshToken,
            )
            error.response.config.headers['authorization'] =
              response.data.metadata.accessToken
            return axios(error.response.config)
          } catch (err) {
            throw err
          }
        })
        .catch(async (error2) => {
          await AsyncStorage.removeItem(REFRESH_TOKEN)
          await AsyncStorage.removeItem(ACCESS_TOKEN)
          await AsyncStorage.removeItem(USER_ID)
          await AsyncStorage.removeItem(USER_INFO)

          return Promise.reject(error2)
        })
        .finally(createAxiosResponseInterceptor)
    },
  )
}

createAxiosResponseInterceptor()

export { authInstance }
