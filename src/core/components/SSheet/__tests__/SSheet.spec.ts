import { describe, expect, test } from 'vitest'
import { mount, type MountOptions, type Wrapper } from '@vue/test-utils'
import SSheet from '../SSheet.comp.vue'

describe('Компонент SSheet', () => {
  const m = (opts: MountOptions<Vue> = {}): Wrapper<Vue> =>
    // @ts-expect-error wtf?
    mount(SSheet, opts)

  test('Должен отображать цветной компонент', () => {
    const wrapper = m({ propsData: { color: 'blue lighten-1' } })

    expect(wrapper.classes('blue')).toBe(true)
    expect(wrapper.classes('lighten-1')).toBe(true)
  })

  test('Должен отображать квадратный компонент', () => {
    const wrapper = m({ propsData: { tile: true } })

    expect(wrapper.classes('rounded-0')).toBe(true)
  })
})
