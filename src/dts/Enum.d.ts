/**
 * Тип перечисление.
 */
type Enum<T extends readonly string[]> = { [P in T[number]]: P }
