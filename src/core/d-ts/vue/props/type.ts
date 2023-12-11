import type { Merge, StrictOmit } from 'ts-essentials'
import type { PropOptions } from 'vue'

/**
 * Определение props-ов компонента.
 *
 * @author Ераносян Эдуард
 * @since 1.0.0
 * @version 1.0.0
 */
export type Props<T> = {
  readonly [P in keyof T]: Readonly<
    Merge<
      StrictOmit<PropOptions<T[P]>, 'default'>,
      { default: T[P] extends object ? () => T[P] : T[P] }
    >
  >
}
