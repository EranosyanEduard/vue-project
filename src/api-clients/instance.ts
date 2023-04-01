import * as Auth from './auth'

const { VITE_APP_MODE = 'DEV' } = import.meta.env
const API_CLIENT_MODE: 'live' | 'mock' = VITE_APP_MODE === 'DEV' ? 'mock' : 'live'

const apiClient = { user: Auth[API_CLIENT_MODE] } as const

export default apiClient
