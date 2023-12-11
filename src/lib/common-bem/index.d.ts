/**
 * Декларация типов для npm-пакета **common-bem**.
 *
 * @author Ераносян Эдуард
 * @see https://github.com/iamstarkov/common-bem
 * @since 1.0.0
 * @version 1.0.0
 */
declare module 'common-bem' {
  import { String, Union } from 'ts-toolbelt'

  /**
   * Возвращает CSS-класс, представляющий БЭМ-элемент.
   */
  type El<Block extends string, El extends string> = `${Block}__${El}`

  /**
   * Возвращает CSS-классы, представляющие БЭМ-блок или БЭМ-элемент,
   * использующий модификаторы.
   */
  type Modifiers<T extends string, U extends object> = String.Join<
    Union.ListOf<T | Modifiers_<T, U>[keyof U]>,
    ' '
  >

  /**
   * Утилита для типа **Modifiers**.
   */
  type Modifiers_<T extends string, U extends object> = {
    [P in keyof U]: U[P] extends true
      ? `${T}--${P}`
      : U[P] extends string
      ? `${T}--${P}-${U[P]}`
      : never
  }

  type RecordOfModifiers = Record<string, boolean | string>

  /**
   * Возвращает API для создания CSS-классов, соответствующие спецификации
   * **БЭМ**.
   * @param block название БЭМ-блока
   *
   * @author Ераносян Эдуард
   * @since 1.0.0
   * @version 1.0.0
   *
   * @example
   * const b = lock('b')
   *
   * block() // 'b'
   * block({ m: true }) // 'b b--m'
   * block({ m: 'v' }) // 'b b--m-v'
   *
   * block('e') // 'b__e'
   * block('e', { m: true }) // 'b__e b__e--m'
   * block('e', { m: 'value' }) // 'b__e b__e--m-v'
   */
  export function lock<B extends string>(
    block: B
  ): <
    T extends string | RecordOfModifiers | undefined = undefined,
    U extends RecordOfModifiers | undefined = undefined
  >(
    elOrBlockModifiers?: T,
    elModifiers?: U
  ) => T extends string
    ? U extends object
      ? Modifiers<El<B, T>, U>
      : El<B, T>
    : T extends object
    ? Modifiers<B, T>
    : B
}
