import axios from 'axios'
import { X_API_KEY } from '../constant/key'

const notAuthInstance = axios.create({
  headers: {
    'x-api-key': X_API_KEY,
  },
})
export { notAuthInstance }
