/**
 * Первый элемент строки.
 * @example
 * type T = Head<'TypeScript'> // 'T'
 * type Never = Head<''> // never
 */
export type Head<S extends string> = S extends `${infer Hd}${string}` ? Hd : never
