import { noop } from 'lodash'
import { describe, expect, test, vi } from 'vitest'
import Vue, { defineComponent } from 'vue'
import { mount, type MountOptions, type Wrapper } from '@vue/test-utils'
import { HookTypes, UTILS, useElevation } from '@/core/hooks'
import { SubhookTypes } from '@/core/subhooks'

describe('Тест хука "useSync"', () => {
  /* Константы */

  const Component = defineComponent({
    name: 'TheTest',
    props: UTILS.USE_ELEVATION.PROPS,
    setup: (props) => useElevation(props),
    render(h) {
      return h('div', { class: this.api.elevation })
    }
  })

  const m = (opts?: MountOptions<Vue>): Wrapper<Vue> => {
    // @ts-expect-error wtf?
    return mount(Component, opts)
  }

  test('Должен синхронизировать значения компонента и хука', async () => {
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
    Array(UTILS.USE_ELEVATION.MAX + 1)
      .fill(undefined)
      .flatMap((_, index) => [
        { expected: true, received: index },
        { expected: true, received: index.toString() }
      ])
      .concat([
        { expected: false, received: UTILS.USE_ELEVATION.MIN - 1 },
        { expected: false, received: (UTILS.USE_ELEVATION.MIN - 1).toString() },
        { expected: false, received: UTILS.USE_ELEVATION.MAX + 1 },
        { expected: false, received: (UTILS.USE_ELEVATION.MAX + 1).toString() },
        { expected: false, received: NaN },
        { expected: false, received: 'wtf' }
      ])
  )(
    'Должен валидировать синхронизированное значение $received и предупреждать, если оно недопустимо',
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

  test('Должен позволять создавать собственный валидатор для синхронизированного значения', async () => {
    const spy = vi.spyOn(console, 'table').mockImplementation(noop)
    const wrapper = m({ propsData: { elevation: 0 } })
    // @ts-expect-error Экземпляр содержит данное свойство.
    const { elevation } = wrapper.vm.sync
    const resyncSpy = vi.spyOn(elevation, 'resync')
    const unsyncSpy = vi.spyOn(elevation, 'unsync')

    expect(wrapper.classes('elevation-0')).toBe(true)

    elevation.validate((v: HookTypes.UseElevation.IRefs['elevation']) => {
      return v !== 0 || { [SubhookTypes.UseSync.FALLBACK_VALUE_KEY]: undefined }
    })

    expect(resyncSpy).toHaveBeenCalled()
    expect(unsyncSpy).toHaveBeenCalled()
    await wrapper.vm.$nextTick()
    expect(wrapper.classes()).toHaveLength(0)
    expect(spy).toHaveBeenLastCalledWith({
      error: 'вы пытаетесь присвоить недопустимое значение',
      hook: 'useSync',
      key: 'elevation',
      value: 0
    })

    vi.resetAllMocks()
  })

  test('Должен прекращать синхронизацию значений компонента и хука', async () => {
    const wrapper = m()

    expect(wrapper.classes()).toHaveLength(0)

    await wrapper.setProps({ elevation: 0 })
    expect(wrapper.classes('elevation-0')).toBe(true)

    // @ts-expect-error Экземпляр содержит данное свойство.
    wrapper.vm.sync.elevation.unsync()
    await wrapper.setProps({ elevation: 1 })
    expect(wrapper.classes('elevation-0')).toBe(true)
  })
})
