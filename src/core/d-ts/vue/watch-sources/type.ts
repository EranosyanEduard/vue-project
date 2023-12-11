import type { WatchSource } from 'vue'

/**
 * Возвращает тип **T**, значения которого преобразованы в интерфейс
 * **WatchSource**.
 *
 * @author Ераносян Эдуард
 * @since 1.0.0
 * @version 1.0.0
 *
 * @example
 * type HookParams = WatchSources<{ red: number; green: number; blue: number }>
 * type Red = HookParams['red'] // number | WatchSource<number>
 */
export type WatchSources<T extends object> = {
  [P in keyof T]: WatchSource<T[P]> | T[P]
}
