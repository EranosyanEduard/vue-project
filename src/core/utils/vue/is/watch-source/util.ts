import { isFunction } from 'lodash'
import { type WatchSource, isRef } from 'vue'
import { computedRef } from '../computed-ref'

/**
 * Возвращает логическое значение, указывающее, что аргумент **v** соответствует
 * интерфейсу **WatchSource**.
 * @param v произвольное значение
 *
 * @author Ераносян Эдуард
 * @since 1.0.0
 * @version 1.0.0
 */
function watchSource(v: unknown): v is WatchSource<unknown> {
  return computedRef(v) || isRef(v) || isFunction(v)
}

export default watchSource
