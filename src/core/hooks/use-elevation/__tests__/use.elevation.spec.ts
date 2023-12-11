import { noop } from 'lodash'
import { describe, expect, test, vi } from 'vitest'
import Vue, { defineComponent } from 'vue'
import { mount, type MountOptions, type Wrapper } from '@vue/test-utils'
import use from '../use'
import { MAX, MIN, PROPS } from '../utils'

describe('Тест хука "useElevation"', () => {
  /* Константы */

  const Component = defineComponent({
    name: 'TheTest',
    props: PROPS,
    setup: (props) => use(props),
    render(h) {
      return h('div', { class: this.api.elevation })
    }
  })

  const m = (opts?: MountOptions<Vue>): Wrapper<Vue> => {
    // @ts-expect-error wtf?
    return mount(Component, opts)
  }

  test('Должен создавать значение CSS-класса', async () => {
    const wrapper = m()

    expect(wrapper.classes()).toHaveLength(0)

    await wrapper.setProps({ elevation: 0 })
    expect(wrapper.classes('elevation-0')).toBe(true)

    await wrapper.setProps({ elevation: 1 })
    expect(wrapper.classes('elevation-1')).toBe(true)

    await wrapper.setProps({ elevation: 2 })
    expect(wrapper.classes('elevation-2')).toBe(true)
  })

  test.each(
    Array(MAX + 1)
      .fill(undefined)
      .flatMap((_, index) => [
        { expected: true, received: index },
        { expected: true, received: index.toString() }
      ])
      .concat([
        { expected: false, received: MIN - 1 },
        { expected: false, received: (MIN - 1).toString() },
        { expected: false, received: MAX + 1 },
        { expected: false, received: (MAX + 1).toString() },
        { expected: false, received: NaN },
        { expected: false, received: 'wtf' }
      ])
  )(
    'Должен валидировать значение $received и предупреждать, если оно недопустимо',
    async ({ expected, received }) => {
      const spy = vi.spyOn(console, 'table').mockImplementation(noop)
      const wrapper = m({ propsData: { elevation: received } })

      if (expected) {
        expect(wrapper.classes(`elevation-${received}`)).toBe(true)
      } else {
        expect(spy).toHaveBeenCalledWith({
          error: 'вы пытаетесь присвоить недопустимое значение',
          hook: 'useSync',
          key: 'elevation',
          value: received
        })
      }

      vi.resetAllMocks()
    }
  )
})
