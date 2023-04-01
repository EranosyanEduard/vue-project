import type { DeepReadonly, Dictionary, DictionaryValues } from 'ts-essentials'
import type { THttpClient } from '../http-client'
import type * as I from './interfaces'

/**
 * Возвращает фабрику API-клиентов с определенным контекстом - HTTP-клиентом.
 * @param httpClient HTTP-клиент
 */
const apiClient =
  (httpClient: THttpClient.IHttpClient) =>
  <ApiClient extends Partial<I.ApiClient>>(
    apiClient: DeepReadonly<ApiClient> & ThisType<typeof httpClient>
  ): DeepReadonly<ApiClient> =>
    Object.entries<DictionaryValues<I.ApiClient>>(apiClient).reduce<
      Dictionary<DictionaryValues<I.ApiClient>>
    >((acc, [apiClientKey, dictOfAsyncFn]) => {
      acc[apiClientKey] = new Proxy(dictOfAsyncFn, {
        get: (target, key) => {
          if (key in target) {
            return target[key as keyof typeof target].bind(httpClient)
          }
        }
      })
      return acc
    }, {}) as DeepReadonly<ApiClient>

export default apiClient
