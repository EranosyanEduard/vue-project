import type { Dictionary } from 'ts-essentials'

/**
 * Создать перечисление из кортежа.
 * @param tuple кортеж строк
 * @example
 * console.log(createEnum(['vSignIn', 'vSignUp', 'vSignOut']));
 * // { vSignIn: 'vSignIn', vSignUp: 'vSignUp', vSignOut: 'vSignOut' }
 */
function createEnum<T extends readonly string[]>(tuple: T): Readonly<Enum<T>> {
  return tuple.reduce<Dictionary<string>>((acc, it) => {
    acc[it] = it
    return acc
  }, {}) as ReturnType<typeof createEnum<T>>
}

export default createEnum
