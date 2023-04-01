import type { Dictionary } from 'ts-essentials'

/**
 * Возвращает объект с выбранными свойствами.
 * @param tuple кортеж строк
 * @example
 * console.log(pick(
 *   { vSignIn: 'vSignIn', vSignUp: 'vSignUp', vSignOut: 'vSignOut' },
 *   'vSignUp', 'vSignOut')
 * ); // { vSignUp: 'vSignUp', vSignOut: 'vSignOut' }
 */
function pick<T extends Dictionary<unknown>, K extends keyof T>(dict: T, ...keys: K[]): Pick<T, K> {
  return keys.reduce<Dictionary<unknown>>((acc, it) => {
    acc[it as string] = dict[it]
    return acc
  }, {}) as ReturnType<typeof pick<T, K>>
}

export default pick
