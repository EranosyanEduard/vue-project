/**
 * Добавить элемент **Type** в конец массива **Arr**.
 * @example
 * type Teams = Push<['JavaScript'], 'TypeScript'>; // ['JavaScript', 'TypeScript]
 */
export type Push<Arr extends readonly unknown[], Type> = [...Arr, Type]
