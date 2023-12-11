import type { U } from '@/core/d-ts'

/**
 * Интерфейсы хука, подлежащие синхронизации.
 *
 * @author Ераносян Эдуард
 * @since 1.0.0
 * @version 1.0.0
 */
export interface IRefs {
  elevation: U.Or.Undefined<number | string>
}
