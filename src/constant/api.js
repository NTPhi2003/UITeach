const BASE_API_URL = process.env.EXPO_PUBLIC_BASE_API_URL
const AUTH_API_URL = `${BASE_API_URL}users/`
const LOGIN_API_URL = `${AUTH_API_URL}signin`
const SIGNUP_API_URL = `${AUTH_API_URL}signup`

export { LOGIN_API_URL, SIGNUP_API_URL }
