/**
 * Длина массива **Arr**.
 * @example
 * type One = Length<['TypeScript']>; // 1
 */
export type Length<Arr extends readonly unknown[]> = Arr['length']
