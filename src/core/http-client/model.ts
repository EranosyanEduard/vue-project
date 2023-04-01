import axios, { AxiosError, isAxiosError, type AxiosInstance, type AxiosRequestConfig } from 'axios'
import is from 'relax-is'
import type { MarkRequired } from 'ts-essentials'
import type * as I from './interfaces'

/**
 * @classdesc Класс представляет обертку для готового HTTP-клиента.
 */
class HttpClient implements I.IHttpClient {
  readonly #instance: AxiosInstance
  readonly #token: Nullable<I.IHttpClientInit['token']>

  constructor(init: Nullable<I.IHttpClientInit>) {
    const { baseUrl, token } = init ?? {}

    this.#instance = axios.create({ baseURL: baseUrl })
    this.#token = token
  }

  async get<Data>(params: Omit<I.IHttpRequestParams<never>, 'body'>): Promise<Data> {
    const data = await this.#send<never, Data>('get', params)
    return data
  }

  async post<Data, Body>(params: I.IHttpRequestParams<Body>): Promise<Data> {
    const data = await this.#send<Body, Data>('post', params)
    return data
  }

  /**
   * Отправить HTTP-запрос.
   * @param method HTTP-метод
   * @param params параметры HTTP-запроса
   */
  async #send<Body, Data>(
    method: keyof I.IHttpClient,
    params: I.IHttpRequestParams<Body>
  ): Promise<Data> {
    const { body, requiresToken, url } = params
    const config: MarkRequired<AxiosRequestConfig, 'headers'> = { headers: {} }

    if (requiresToken && is.fun(this.#token)) {
      const [header, token] = this.#token()
      config.headers[header] = token
    }

    try {
      switch (method) {
        case 'get': {
          const { data } = await this.#instance.get<Data>(url, config)
          return data
        }
        case 'post': {
          const { data } = await this.#instance.post<Data>(url, body, config)
          return data
        }
      }
    } catch (error) {
      const axiosError = isAxiosError(error)
        ? await Promise.reject(error)
        : await Promise.reject(new AxiosError('Неожиданная ошибка', HttpClient.name))

      return axiosError
    }
  }
}

export default HttpClient
