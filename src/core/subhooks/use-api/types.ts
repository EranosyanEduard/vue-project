import type { AnyFunction, Dictionary } from 'ts-essentials'
import type { ComputedRef, Ref, UnwrapRef } from 'vue'

/**
 * Прототип API хука.
 *
 * @author Ераносян Эдуард
 * @since 1.0.0
 * @version 1.0.0
 */
export type Api = Dictionary<AnyFunction | ComputedRef<unknown> | Ref<unknown>>

/**
 * Api хука.
 *
 * @author Ераносян Эдуард
 * @since 1.0.0
 * @version 1.0.0
 */
export type ApiLike<T extends Api> = {
  [P in keyof T]: UnwrapRef<T[P]>
}
