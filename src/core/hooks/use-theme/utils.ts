import type { PropType } from 'vue'
import type { V } from '@/core/d-ts'
import { vue } from '@/core/utils'
import type { Refs } from './types'

/**
 * Props-ы, необходимые для работы хука.
 * @constant
 */
const PROPS: V.Props<Refs> = Object.freeze({
  dark: {
    type: Boolean as PropType<Refs['dark']>,
    default: false
  },
  light: {
    type: Boolean as PropType<Refs['light']>,
    default: false
  }
})

/**
 * Название свойства, использующегося в конструкции **provide / inject**.
 * @constant
 */
const PROVIDE_INJECT = vue.provideInject<{ isDark: boolean }>(Symbol('theme'))

export { PROPS, PROVIDE_INJECT }
