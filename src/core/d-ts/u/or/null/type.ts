/**
 * Тип-сумма **T | null**.
 *
 * @author Stack
 * @since 0.9.0
 * @version 1.0.0
 *
 * @example
 * type ObjOrNull = U.Or.Null<{ id: number }>; // { id: number } | null
 */
export type Null<T> = T | null
