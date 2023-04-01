import { httpClient } from '../http-client'
import apiClient from './model'

/**
 * Фабрика API-клиентов.
 */
const defineApiClient = apiClient(httpClient)

export default defineApiClient
