import type { Dictionary } from 'ts-essentials'
import type { CSSProperties } from 'vue/types/jsx'
import type { U } from '@/core/d-ts'

/**
 * Интерфейсы хука, подлежащие синхронизации.
 *
 * @author Ераносян Эдуард
 * @since 1.0.0
 * @version 1.0.0
 */
export type Refs = Dictionary<
  U.Or.Undefined<string | number>,
  keyof Pick<
    CSSProperties,
    'height' | 'maxHeight' | 'maxWidth' | 'minHeight' | 'minWidth' | 'width'
  >
>
