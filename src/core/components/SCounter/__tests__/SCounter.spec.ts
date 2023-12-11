import { describe, expect, test } from 'vitest'
import { mount, type MountOptions, type Wrapper } from '@vue/test-utils'
import SCounter from '../SCounter.comp.vue'

describe('Компонент SCounter', () => {
  const m = (opts: MountOptions<Vue> = {}): Wrapper<Vue> => {
    // @ts-expect-error wtf?
    return mount(SCounter, opts)
  }

  test('Должен отображать контент компонента по умолчанию', () => {
    const wrapper = m()

    expect(wrapper.classes('v-counter')).toBe(true)
    expect(wrapper.classes('theme')).toBe(true)
    expect(wrapper.classes('theme--light')).toBe(true)
    expect(wrapper.text().trim()).toBe('0')
  })

  test('Должен отображать в кач-ве контента текущее значение', () => {
    expect(
      m({ propsData: { value: 5 } })
        .text()
        .trim()
    ).toBe('5')
    expect(
      m({ propsData: { value: '5' } })
        .text()
        .trim()
    ).toBe('5')
  })

  test('Должен отображать в кач-ве контента текущее и максимальное значения', () => {
    expect(
      m({ propsData: { max: 10, value: 5 } })
        .text()
        .trim()
    ).toBe('5 / 10')
    expect(
      m({ propsData: { max: '10', value: '5' } })
        .text()
        .trim()
    ).toBe('5 / 10')
  })

  test('Должен "сообщать" о превышении максимального значения', () => {
    expect(
      m({ propsData: { max: 10, value: 15 } }).classes('v-counter--error')
    ).toBe(true)
  })
})
