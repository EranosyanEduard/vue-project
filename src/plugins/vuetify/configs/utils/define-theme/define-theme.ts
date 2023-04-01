import is from 'relax-is/src'
import type { DeepReadonly, DeepWritable, Dictionary } from 'ts-essentials'
import type * as Types from '../../types'

/**
 * Возвращает вариант темы, подготовленный для фреймворка vuetify.
 * @param theme вариант темы
 * @example
 * const theme = reducer({
 *   error: '#ce574a',
 *   primary: { base: '#1a965a', lighten5: '#e8f5ef' },
 *   text: ['#030724', '#525e74']
 * });
 *
 * console.log(theme.error); // '#ce574a'
 * console.log(theme.primary); // '#1a965a'
 * console.log(theme['primary-lighten5']); // '#e8f5ef'
 * console.log(theme['text-1']); // '#030724'
 * console.log(theme['text-2']); // '#525e74'
 */
function reducer<T extends DeepReadonly<Types.ThemeVariant>>(
  theme: T
): Types.Theme<DeepWritable<T>> {
  return Object.entries(theme).reduce<Dictionary<Types.ColorValue>>(
    (acc, [colorCategoryKey, colorCategoryValue]) => {
      if (is.num(colorCategoryValue) || is.str(colorCategoryValue)) {
        acc[colorCategoryKey] = colorCategoryValue
      } else if (is.obj(colorCategoryValue)) {
        Object.entries(colorCategoryValue).reduce(
          (thisAcc, [colorModeKey, colorModeValue], index) => {
            const colorKey =
              colorModeKey === 'base'
                ? colorCategoryKey
                : `${colorCategoryKey}-${is.arr(colorCategoryValue) ? index + 1 : colorModeKey}`

            thisAcc[colorKey] = colorModeValue
            return thisAcc
          },
          acc
        )
      }
      return acc
    },
    {}
  ) as ReturnType<typeof reducer<T>>
}

/**
 * Возвращает конфигурацию темы, подготовленную для конструктора Vuetify.
 * @param theme варианты темы
 * @example
 * const theme = defineTheme({
 *   dark: {
 *     error: '#ce574a',
 *     primary: { base: '#1a965a', lighten5: '#e8f5ef' },
 *     text: ['#030724', '#525e74']
 *   },
 *   light: {
 *     error: '#ce574a',
 *     primary: { base: '#1a965a', lighten5: '#e8f5ef' },
 *     text: ['#030724', '#525e74']
 *   }
 * });
 *
 * console.log(theme.dark.error); // '#ce574a'
 * console.log(theme.dark.primary); // '#1a965a'
 * console.log(theme.dark['primary-lighten5']); // '#e8f5ef'
 * console.log(theme.dark['text-1']); // '#030724'
 * console.log(theme.dark['text-2']); // '#525e74'
 *
 * console.log(theme.light.error); // '#ce574a'
 * console.log(theme.light.primary); // '#1a965a'
 * console.log(theme.light['primary-lighten5']); // '#e8f5ef'
 * console.log(theme.light['text-1']); // '#030724'
 * console.log(theme.light['text-2']); // '#525e74'
 */
function defineTheme<T extends DeepReadonly<Types.ThemeVariants>>(
  theme: T
): { [P in keyof T]: Types.Theme<NonNullable<T[P]>> } {
  return Object.entries(theme).reduce<Dictionary<Types.Theme<Types.ThemeVariant>>>(
    (acc, [themeMode, themeVariant]) => {
      acc[themeMode] = reducer(themeVariant)
      return acc
    },
    {}
  ) as ReturnType<typeof defineTheme<T>>
}
export default defineTheme
