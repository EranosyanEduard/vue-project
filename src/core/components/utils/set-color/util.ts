import type { CSSProperties } from 'vue/types/jsx'
import type { U } from '@/core/d-ts'
import type { ColorOpts } from './types'

/**
 * Возвращает логическое значение, указывающее, что значение аргумента
 * **colorLike** является допустимым значением CSS-цвета.
 * @param colorLike представление цвета
 *
 * @author Ераносян Эдуард
 * @see https://stackoverflow.com/questions/48484767/javascript-check-if-string-is-valid-css-color
 * @since 1.0.0
 * @version 1.0.0
 */
function isCssColor(colorLike: string): boolean {
  const option = new Option()

  option.style.color = colorLike
  return option.style.color.length !== 0
}

/**
 * Возвращает аргумент **opts**, дополненный CSS-классами или CSS-стилями,
 * настраивающими цвет. Обобщённая версия методов **setBackgroundColor** и
 * **setTextColor**.
 * @param prop CSS-свойство, представляющее цвет
 * @param color значение цвета
 * @param opts объект, содержащий CSS-классы и CSS-стили
 *
 * @author Ераносян Эдуард
 * @since 1.0.0
 * @version 1.0.0
 *
 *  @example
 * const A = setColor('backgroundColor', 'primary', { class: { 'secondary--text': true }, style: { height: '100px' } })
 * const A = setColor('backgroundColor', '#F00', { class: { 'secondary--text': true }, style: { height: '100px' } })
 *
 * console.log(A) // { class: { 'primary': true, 'secondary--text': true }, style: { height: '100px' } }
 * console.log(B) // { class: { 'secondary--text': true }, style: { backgroundColor: '#F00'; borderColor: '#F00', height: '100px' } }
 */
function setColor(
  prop: keyof Pick<CSSProperties, 'backgroundColor' | 'color'>,
  color: U.Or.Undefined<string>,
  opts: Partial<ColorOpts>
): ColorOpts {
  const trimmedColor = color?.trim() ?? ''

  opts.class ??= []
  opts.style ??= []

  if (!Array.isArray(opts.style)) opts.style = [opts.style]
  if (!Array.isArray(opts.class)) opts.class = [opts.class]

  // @ts-expect-error Значение соответствует типу, возвращаемому функцией.
  if (trimmedColor.length === 0) return opts
  if (isCssColor(trimmedColor)) {
    switch (prop) {
      case 'backgroundColor':
        opts.style.push({
          backgroundColor: trimmedColor,
          borderColor: trimmedColor
        })
        break
      case 'color':
        opts.style.push({ caretColor: trimmedColor, color: trimmedColor })
    }
  } else {
    switch (prop) {
      case 'backgroundColor':
        opts.class.push(trimmedColor)
        break
      case 'color': {
        const [block = '', modifier = ''] = trimmedColor.split(/\s+/, 2)

        if (block.length !== 0) {
          opts.class.push(`${block}--text`)
        }
        if (modifier.length !== 0) {
          opts.class.push(`text--${modifier}`)
        }
      }
    }
  }
  // @ts-expect-error Значение соответствует типу, возвращаемому функцией.
  return opts
}

export default setColor
