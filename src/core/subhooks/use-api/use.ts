import { entries, isFunction } from 'lodash'
import type { Dictionary } from 'ts-essentials'
import type { Api, ApiLike } from './types'

/**
 * Возвращает обработанный интерфейс хука, проксирующий значения, созданные
 * с помощью функций **computed** и **ref**.
 * @param api прототип публичной части интерфейса хука
 *
 * @author Ераносян Эдуард
 * @since 1.0.0
 * @version 1.0.0
 */
const use = <T extends Api>(api: Readonly<T>): ApiLike<T> => {
  return entries(api).reduce<Dictionary<unknown>>((acc, [apiKey, apiDef]) => {
    if (isFunction(apiDef)) {
      acc[apiKey] = apiDef
    } else {
      Reflect.defineProperty(acc, apiKey, {
        get(): unknown {
          return apiDef.value
        },
        set(v: unknown) {
          // @ts-expect-error Безопасное действие.
          apiDef.value = v
          // Условие выполнится, если apiDef - ComputedRef, не имеющая сеттера.
          if (apiDef.value !== v) {
            console.table({
              error: 'невозможно присвоить значение',
              hook: 'useApi',
              key: apiKey
            })
          }
        }
      })
    }
    return acc
  }, {}) as ApiLike<T>
}

export default use
