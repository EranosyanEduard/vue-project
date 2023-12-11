/**
 * Декларация типов для npm-пакета **units-css**.
 *
 * @author Ераносян Эдуард
 * @see https://github.com/alexdunphy/units
 * @since 1.0.0
 * @version 1.0.0
 */
declare module 'units-css' {
  import type { LengthUnit } from '@/core/utils/css/enum/length-unit'

  /**
   * Единицы измерения, использующиеся в CSS для определения углов.
   */
  export type Angle = 'deg' | 'grad' | 'rad' | 'turn'

  /**
   * Возвращает единицы измерения по умолчанию для CSS-свойства **property**.
   * @param property название CSS-свойства
   *
   * @author Ераносян Эдуард
   * @since 1.0.0
   * @version 1.0.0
   *
   * @example
   * getDefaultUnit('opacity') // ''
   * getDefaultUnit('rotate')  // 'deg'
   * getDefaultUnit('width')   // 'px'
   */
  export function getDefaultUnit<T extends string>(
    property: T
  ): T extends
    | 'rotate'
    | `rotate${'3d' | 'X' | 'Y' | 'Z'}`
    | 'skew'
    | `skew${'X' | 'Y'}`
    ? Extract<Angle, 'deg'>
    : T extends
        | 'lineHeight'
        | 'opacity'
        | 'scale'
        | `scale${'3d' | 'X' | 'Y' | 'Z'}`
    ? ''
    : Extract<LengthUnit, 'px'>

  /**
   * Возвращает значение CSS-свойства, разобранное на 2-е части: непосредственно
   * значение CSS-свойства и его единицы измерения.
   * @param value значение CSS-свойства
   * @param property название CSS-свойства
   *
   * @author Ераносян Эдуард
   * @since 1.0.0
   * @version 1.0.0
   *
   * @example
   * parse(1)          // { unit: '', value: 1 }
   * parse(1, 'width') // { unit: 'px', value: 1 }
   * parse('1px')      // { unit: 'px', value: 1 }
   */
  export function parse(
    value: number | string,
    property?: string
  ): { unit: string; value: number }
}
