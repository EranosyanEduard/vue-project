import type { V } from '@/core/d-ts'
import type { HTMLAttributes, StyleValue } from 'vue/types/jsx'

/**
 * Значение, возвращаемое методом **setColor**.
 */
export type ColorOpts = {
  [P in keyof Pick<HTMLAttributes, 'class' | 'style'>]: P extends 'class'
    ? V.ClassValue
    : P extends 'style'
    ? StyleValue
    : never
}
