import { keys, omit } from 'lodash'
import { noop, type Dictionary } from 'ts-essentials'
import { describe, expect, test, vi } from 'vitest'
import { defineComponent } from 'vue'
import { mount, type MountOptions, type Wrapper } from '@vue/test-utils'
import use from '../use'
import { PROPS } from '../utils'
import type { Refs } from '../types'
import { css } from '@/core/utils'

describe('Тест хука "useMeasure"', () => {
  const Component = defineComponent({
    name: 'TheTest',
    props: PROPS,
    setup: (props) => use(props),
    render(h) {
      return h('div', { style: this.api.style })
    }
  })

  const m = (opts?: MountOptions<Vue>): Wrapper<Vue> => {
    // @ts-expect-error wtf?
    return mount(Component, opts)
  }

  test('Должен вычислять CSS-стили компонента', async () => {
    const propKeys = keys(PROPS) as Array<keyof Refs>
    const wrapper = m()
    const el = wrapper.element as HTMLDivElement

    expect(propKeys.every((it) => el.style[it] === '')).toBe(true)

    await wrapper.setProps(
      propKeys.reduce<Dictionary<number>>((acc, it) => {
        acc[it] = 100
        return acc
      }, {})
    )
    expect(propKeys.every((it) => el.style[it] === '100px')).toBe(true)

    await wrapper.setProps(
      propKeys.reduce<Dictionary<string>>((acc, it) => {
        acc[it] = '200px'
        return acc
      }, {})
    )
    expect(propKeys.every((it) => el.style[it] === '200px')).toBe(true)
  })

  test.each([
    // Недопустимые значения
    { expected: false, received: NaN },
    { expected: false, received: '' },
    { expected: false, received: '100deg' },
    // Допустимые значения
    { expected: '', received: undefined },
    { expected: '100px', received: 100 },
    { expected: '100.5px', received: 100.5 },
    { expected: '100px', received: '100' },
    { expected: '100.5px', received: '100.5' },
    ...keys(
      // Исключить vmax и vmin из-за отсутствия области просмотра в
      // тестовом окружении.
      omit(css.enum.lengthUnit.enum, [
        css.enum.lengthUnit.enum.vmax,
        css.enum.lengthUnit.enum.vmin
      ])
    ).flatMap((it) => [
      { expected: `100${it}`, received: `100${it}` },
      { expected: `100.5${it}`, received: `100.5${it}` }
    ])
  ] as const)(
    'Должен ограничивать значения CSS-свойств, где $received -> $expected',
    ({ expected, received }) => {
      const spy = vi.spyOn(console, 'table').mockImplementation(noop)
      const wrapper = m({ propsData: { height: received } })
      const el = wrapper.element as HTMLDivElement

      if (expected === false) {
        expect(spy).toHaveBeenCalled()
      } else {
        expect(el.style.height).toBe(expected)
      }

      vi.resetAllMocks()
    }
  )
})
