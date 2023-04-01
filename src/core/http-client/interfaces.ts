import type { DeepReadonly } from 'ts-essentials'

/**
 * Параметры HTTP-запроса.
 */
export interface IHttpRequestParams<Body> {
  readonly body?: DeepReadonly<Body>
  readonly requiresToken: boolean
  readonly url: string
}

/**
 * HTTP-клиент.
 */
export interface IHttpClient {
  /**
   * Отправить GET-запрос.
   * @param params параметры HTTP-запроса
   */
  get: <Data>(params: Omit<IHttpRequestParams<never>, 'body'>) => Promise<Data>
  /**
   * Отправить POST-запрос.
   * @param params параметры HTTP-запроса
   */
  post: <Data, Body>(params: IHttpRequestParams<Body>) => Promise<Data>
}

/**
 * Конфигурация HTTP-клиента.
 */
export interface IHttpClientInit {
  readonly baseUrl: string
  readonly token: Factory<Pair<NonNullable<ImportMetaEnv['VITE_TOKEN_HEADER']>, string>>
}
