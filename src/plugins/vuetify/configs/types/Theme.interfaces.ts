import type { A } from 'x-ts-essentials'
import type * as E from 'ts-essentials'
import type * as V from 'vuetify/types/services/theme'

/**
 * Типы допустимых значений цветов.
 */
export type ColorValue = NonNullable<Extract<V.VuetifyThemeItem, E.Primitive>>

/**
 * Тема интерфейса.
 */
export type ThemeVariants = { [P in keyof V.VuetifyThemes]?: ThemeVariant }

/**
 * Вариант темы интерфейса, расширяющий соответствующий интерфейс фреймворка
 * vuetify.
 */
export type ThemeVariant = {
  [P in keyof V.VuetifyThemeVariant]?:
    | ColorValue
    | ColorValue[]
    | Partial<E.Dictionary<ColorValue, keyof V.VuetifyParsedThemeItem>>
}

/**
 * Конфигурация темы интерфейса, подготовленная для конструктора Vuetify.
 * @see документацию функции **defineTheme**
 */
export type Theme<T extends ThemeVariant> = E.UnionToIntersection<E.DictionaryValues<__Theme<T>>>

type __Theme<T extends ThemeVariant> = {
  [P in keyof T]: T[P] extends readonly unknown[]
    ? __ColorArrToObj<T[P], P & string, [unknown], never>
    : T[P] extends E.Dictionary<ColorValue>
    ? __ColorObjToObj<T[P], P & string>
    : E.Dictionary<T[P], P>
}

/**
 * Преобразовать кортеж из значений цветов, в объектный литерал.
 * @example
 * type Colors = ['#f00', '#0f0', '#00f'];
 * type Result = __ColorArrToObj<Colors, 'background'>;
 * // Result = { 'background-1': '#f00'; 'background-2': '#0f0'; 'background-3': '#00f' }
 */
type __ColorArrToObj<
  Arr extends readonly unknown[],
  Color extends string,
  Nums extends unknown[],
  Acc extends E.Dictionary<unknown>
> = Arr extends readonly [infer Hd, ...infer Tl]
  ? __ColorArrToObj<
      Tl,
      Color,
      A.Push<Nums, unknown>,
      A.Length<Nums> extends 1
        ? E.Dictionary<Hd, `${Color}-${A.Length<Nums>}`>
        : E.Merge<E.Dictionary<Hd, `${Color}-${A.Length<Nums>}`>, Acc>
    >
  : Acc

/**
 * Преобразовать объект из значений цветов, в объектный литерал.
 * @example
 * type Colors = { red: '#f00'; green: '#0f0'; blue: '#00f' };
 * type Result = __ColorObjToObj<Colors, 'background'>;
 * // Result = { 'background-red': '#f00'; 'background-green': '#0f0'; 'background-blue': '#00f' }
 */
type __ColorObjToObj<Colors extends E.Dictionary<ColorValue>, Color extends string> = {
  [Prop in keyof Colors as Prop extends 'base' ? Color : `${Color}-${Prop & string}`]: Colors[Prop]
}
