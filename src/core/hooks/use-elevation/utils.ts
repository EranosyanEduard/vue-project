import type { PropType } from 'vue'
import type { V } from '@/core/d-ts'
import type { IRefs } from './types'

/**
 * Максимальное значение модификатора CSS-класса **elevation**.
 * @constant
 */
const MAX = 24

/**
 * Минимальное значение модификатора CSS-класса **elevation**.
 * @constant
 */
const MIN = 0

/**
 * Props-ы, необходимые для работы хука.
 * @constant
 */
const PROPS: V.Props<IRefs> = {
  elevation: {
    type: [Number, String] as PropType<IRefs['elevation']>,
    default: undefined
  }
}

export { MAX, MIN, PROPS }
