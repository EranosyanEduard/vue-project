import type { U } from '../..'
import type { Classes } from '../classes'

/**
 * Значение HTML-атрибута **class**.
 *
 * @author Ераносян Эдуард
 * @since 1.0.0
 * @version 1.0.0
 */
export type ClassValue = string | Classes | Array<U.Or.Undefined<ClassValue>>
