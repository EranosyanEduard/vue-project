import type { PropType } from 'vue'
import { z } from 'zod'
import type { V } from '@/core/d-ts'
import type { IRefs } from './types'

/**
 * Props-ы, необходимые для работы хука.
 * @constant
 */
const PROPS: V.Props<IRefs> = {
  rounded: {
    type: [Boolean, Number, String] as PropType<IRefs['rounded']>,
    default: false
  },
  tile: {
    type: Boolean as PropType<IRefs['tile']>,
    default: false
  }
}

/**
 * Перечисление допустимых значений модификатора CSS-класса **rounded**.
 * @enum
 */
const Rounded = z.enum([
  'circle',
  'pill',
  'sm',
  'md',
  'lg',
  'xl',
  'xxl'
] as const)

export { PROPS, Rounded }
