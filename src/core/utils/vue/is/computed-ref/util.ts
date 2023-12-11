import { isObject } from 'lodash'
import type { ComputedRef } from 'vue'

/**
 * Возвращает логическое значение, указывающее, что аргумент **v** - вычисляемое
 * свойство.
 * @param v произвольное значение
 *
 * @author Ераносян Эдуард
 * @since 1.0.0
 * @version 1.0.0
 */
function computedRef(v: unknown): v is ComputedRef<unknown> {
  return isObject(v) && Reflect.has(v, '__v_isRef') && Reflect.has(v, 'effect')
}

export default computedRef
