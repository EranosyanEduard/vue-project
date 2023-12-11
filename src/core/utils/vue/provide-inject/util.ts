import { inject, provide, type InjectionKey } from 'vue'

/**
 * Тип, возвращаемый функцией **provideInject**.
 */
export type ProvideInject<T> = {
  [P in 'inject' | 'provide']: (
    v: T
  ) => ReturnType<P extends 'inject' ? typeof inject<T> : typeof provide<T>>
}

/**
 * Возвращает интерфейс для использования Vue-конструкции **provide/inject**.
 * @param key ключ, использующийся в конструкции **provide/inject*
 *
 * @author Ераносян Эдуард
 * @since 1.0.0
 * @version 1.0.0
 */
function provideInject<T>(key: InjectionKey<T>): ProvideInject<T> {
  return { inject: (v) => inject(key, v), provide: (v) => provide(key, v) }
}

export default provideInject
