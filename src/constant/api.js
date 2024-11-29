const BASE_API_URL = process.env.EXPO_PUBLIC_BASE_API_URL
const AUTH_API_URL = `${BASE_API_URL}users/`
const LOGIN_API_URL = `${AUTH_API_URL}signin`
const SIGNUP_API_URL = `${AUTH_API_URL}signup`
const REFRESH_TOKEN_API_URL = `${AUTH_API_URL}handleRefreshtoken`
const LESSON_API_URL = `${BASE_API_URL}lessons/`
const ALL_PUBLISHED_LESSON_API_URL = `${LESSON_API_URL}/all-published/`

export {
  LOGIN_API_URL,
  SIGNUP_API_URL,
  REFRESH_TOKEN_API_URL,
  ALL_PUBLISHED_LESSON_API_URL,
}
