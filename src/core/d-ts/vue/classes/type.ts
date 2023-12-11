import type { Dictionary } from 'ts-essentials'

/**
 * Коллекция CSS-классов.
 *
 * @author Ераносян Эдуард
 * @since 1.0.0
 * @version 1.0.0
 */
export type Classes<T extends string = string> = Dictionary<boolean, T>
