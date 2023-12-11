import type { Dictionary } from 'ts-essentials'
import type { WatchSource, WatchStopHandle } from 'vue'

/**
 * Функции, позволяющие управлять синхронизированными значениями.
 *
 * @author Ераносян Эдуард
 * @since 1.0.0
 * @version 1.0.0
 */
export interface ISyncOpts<T> {
  /**
   * Ресинхронизировать значение из хука с аргументом **target**.
   * @param target значение для синхронизации
   */
  resync: (target: WatchSource<T>) => void

  /**
   * Прекратить синхронизацию значений.
   */
  unsync: WatchStopHandle

  /**
   * Определить функцию, проверяющую значение на соответствие установленным
   * правилам.
   * @param validator функция-валидатор
   */
  validate: (validator: Validator<T>) => void
}

/**
 * Функция, синхронизирующая значения компонента и хука.
 *
 * @author Ераносян Эдуард
 * @since 1.0.0
 * @version 1.0.0
 */
export type SyncRefs<T extends object> = {
  [P in keyof T]: ISyncOpts<T[P]>
}

/**
 * Опции, позволяющие настроить правила синхронизации.
 *
 * @author Ераносян Эдуард
 * @since 1.0.0
 * @version 1.0.0
 */
export interface SyncFnOpts<T extends object> {
  validators: {
    [P in keyof T]?: Validator<T[P]>
  }
}

/**
 * Функция, валидирующая синхронизируемое значение.
 *
 * @author Ераносян Эдуард
 * @since 1.0.0
 * @version 1.0.0
 */
export type Validator<T> = (
  value: T
) => true | Dictionary<T, typeof FALLBACK_VALUE_KEY>

/**
 * Ключ, использующийся для передачи "запасного" значения, которое необходимо
 * в случае, если функция-валидатор вернула значение **false**.
 * @author Ераносян Эдуард
 * @since 1.0.0
 * @version 1.0.0
 */
export const FALLBACK_VALUE_KEY = Symbol('fallback')
