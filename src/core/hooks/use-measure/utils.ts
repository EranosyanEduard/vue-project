import type { Dictionary, ValueOf } from 'ts-essentials'
import type { PropOptions, PropType } from 'vue'
import { z } from 'zod'
import type { V } from '@/core/d-ts'
import { SubhookTypes } from '@/core/subhooks'
import { css } from '@/core/utils'
import type { Refs } from './types'

/**
 * Props-ы, необходимые для работы хука.
 * @constant
 */
const PROPS: V.Props<Refs> = Object.freeze(
  (
    [
      'height',
      'maxHeight',
      'maxWidth',
      'minHeight',
      'minWidth',
      'width'
    ] as Array<keyof Refs>
  ).reduce<Dictionary<PropOptions>>((acc, it) => {
    acc[it] = {
      type: [Number, String] as PropType<Refs[typeof it]>,
      default: undefined
    }
    return acc
  }, {}) as V.Props<Refs>
)

/**
 * Функция, позволяющая проверить синхронизируемое значение на соответствие
 * требованиям, предъявляемым интерфейсом хука.
 * @param v синхронизируемое значение
 */
const VALIDATOR: SubhookTypes.UseSync.Validator<ValueOf<Refs>> = (v) => {
  const re = new RegExp(
    `^\\d+(.\\d+)?(${Object.keys(css.enum.lengthUnit.enum).join('|')})?$`
  )
  return (
    z.optional(z.number().or(z.string().regex(re))).safeParse(v).success || {
      [SubhookTypes.UseSync.FALLBACK_VALUE_KEY]: undefined
    }
  )
}

export { PROPS, VALIDATOR }
