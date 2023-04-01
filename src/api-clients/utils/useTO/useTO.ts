/**
 * Количество миллисекунд в секунде.
 * @constant
 */
const MS_PER_SEC = 1000

/**
 * Эмулирует асинхронную операцию.
 * @param executor функция, сигнатура которой повторяет сигнатуру аргумента
 * конструктора Promise
 * @param to таймаут в секундах
 * @example
 * (async (credentials) => {
 *   try {
 *     await useTO((resolve, reject) => {
 *       if (credentials.password === 'qwerty' && credentials.username === 'user') {
 *         resolve(true)
 *       } else {
 *         reject(new Error('Неверные учетные данные'))
 *       }
 *     })
 *   } catch (e: unknown) {
 *     console.error(e)
 *   }
 * })({ password: '', username: '' })
 */
async function useTO<R>(
  executor: (resolve: (v: R) => void, reject: (v: Error) => void) => void,
  to = 2
): Promise<R> {
  const timeout = to > 0 ? to * MS_PER_SEC : 0

  const data = await new Promise<R>((resolve, reject) => {
    setTimeout(executor, timeout, resolve, reject)
  })

  return data
}

export default useTO
