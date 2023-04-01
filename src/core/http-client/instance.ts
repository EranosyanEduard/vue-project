import HttpClient from './model'

const { VITE_BACKEND_URL = '', VITE_TOKEN_HEADER = 'x-api-token' } = import.meta.env

const httpClient = new HttpClient({
  baseUrl: VITE_BACKEND_URL,
  token: () => [VITE_TOKEN_HEADER, localStorage.getItem(VITE_TOKEN_HEADER) ?? '']
})

export default httpClient
