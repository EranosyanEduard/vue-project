import type { Dictionary } from 'ts-essentials'
import type { S } from 'x-ts-essentials'

/**
 * API-клиент.
 */
export type ApiClient = Dictionary<Dictionary<AsyncFn>, S.Head<ApiClientKey>>

/**
 * Названия интерфейсов API-клиента.
 */
type ApiClientKey = Lowercase<'create' | 'read' | 'update' | 'delete'>
