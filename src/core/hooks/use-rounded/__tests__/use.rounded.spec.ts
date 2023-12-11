import { noop } from 'lodash'
import { describe, expect, test, vi } from 'vitest'
import { defineComponent } from 'vue'
import { mount, type MountOptions, type Wrapper } from '@vue/test-utils'
import use from '../use'
import { PROPS, Rounded } from '../utils'

describe('Тест хука "useRounded"', () => {
  const Component = defineComponent({
    name: 'TheTest',
    props: PROPS,
    setup: (props) => use(props),
    render(h) {
      return h('div', { class: this.api.rounded })
    }
  })

  const m = (opts?: MountOptions<Vue>): Wrapper<Vue> => {
    // @ts-expect-error wtf?
    return mount(Component, opts)
  }

  test('Должен вычислять значение CSS-класса "rounded"', async () => {
    const wrapper = m()

    expect(wrapper.classes()).toHaveLength(0)

    await wrapper.setProps({ rounded: true })
    expect(wrapper.classes()).toHaveLength(1)
    expect(wrapper.classes('rounded')).toBe(true)

    await wrapper.setProps({ rounded: 'md' })
    expect(wrapper.classes()).toHaveLength(1)
    expect(wrapper.classes('rounded')).toBe(true)

    await wrapper.setProps({ rounded: 'lg' })
    expect(wrapper.classes()).toHaveLength(1)
    expect(wrapper.classes('rounded-lg')).toBe(true)

    await wrapper.setProps({ tile: true })
    expect(wrapper.classes()).toHaveLength(1)
    expect(wrapper.classes('rounded-0')).toBe(true)

    await wrapper.setProps({ tile: false })
    expect(wrapper.classes()).toHaveLength(1)
    expect(wrapper.classes('rounded-lg')).toBe(true)
  })

  test.each([
    // Недопустимые значения
    { expected: false, received: Math.random() },
    { expected: false, received: Math.random().toString() },
    // Допустимые значения
    { expected: undefined, received: false },
    { expected: 'rounded', received: true },
    { expected: 'rounded-0', received: 0 },
    { expected: 'rounded-circle', received: Rounded.enum.circle },
    { expected: 'rounded-lg', received: Rounded.enum.lg },
    { expected: 'rounded', received: Rounded.enum.md },
    { expected: 'rounded-pill', received: Rounded.enum.pill },
    { expected: 'rounded-sm', received: Rounded.enum.sm },
    { expected: 'rounded-xl', received: Rounded.enum.xl },
    { expected: 'rounded-xxl', received: Rounded.enum.xxl }
  ] as const)(
    'Должен ограничивать значение модификатора CSS-класса "rounded", где rounded - $received',
    ({ expected, received }) => {
      const spy = vi.spyOn(console, 'table').mockImplementation(noop)
      const wrapper = m({ propsData: { rounded: received } })

      if (expected === false) {
        expect(spy).toHaveBeenCalled()
      } else if (expected === undefined) {
        expect(wrapper.classes()).toHaveLength(0)
      } else {
        expect(wrapper.classes()).toHaveLength(1)
        expect(wrapper.classes(expected)).toBe(true)
      }

      vi.resetAllMocks()
    }
  )
})
