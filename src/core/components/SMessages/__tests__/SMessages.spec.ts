import { isArray } from 'lodash'
import { describe, expect, test } from 'vitest'
import { h } from 'vue'
import { mount, type MountOptions, type Wrapper } from '@vue/test-utils'
import SMessages from '../SMessages.comp.vue'

describe('Компонент SMessages', () => {
  const m = (opts: MountOptions<Vue> = {}): Wrapper<Vue> => {
    // @ts-expect-error wtf?
    return mount(SMessages, opts)
  }

  describe('Props "value"', () => {
    test('Значением по умолчанию должен быть массив', () => {
      // @ts-expect-error Экземпляр имеет интерфейс value.
      expect(isArray(m().vm.value)).toBe(true)
    })

    test('Должен отображать переданные сообщения', async () => {
      const wrapper = m({ propsData: { value: ['foo', 'bar', 'baz'] } })
      const messages = wrapper.findAll('.v-messages__message')

      expect(messages).toHaveLength(3)
      expect(messages.at(0).text().trim()).toBe('foo')
      expect(messages.at(1).text().trim()).toBe('bar')
      expect(messages.at(2).text().trim()).toBe('baz')

      await wrapper.setProps({ value: [] })
      // FIXME: wtf?
      // expect(wrapper.findAll('.v-messages__message')).toHaveLength(0)
    })

    test('Не должен интерпретировать сообщения, как HTML-код', () => {
      const wrapper = m({
        propsData: {
          value: [
            '<a class="anchor" href="#">foo</a>',
            '<a class="anchor" href="#">bar</a>',
            '<a class="anchor" href="#">baz</a>'
          ]
        }
      })

      expect(wrapper.findAll('a.anchor')).toHaveLength(0)
    })
  })

  test('Должен иметь слот с обратной видимостью', () => {
    const wrapper = m({
      propsData: { value: ['foo', 'bar', 'baz'] },
      scopedSlots: {
        default(props: { index: number; message: string }) {
          return h('div', { attrs: { id: props.message } }, `${props.index}`)
        }
      }
    })

    expect(wrapper.find<HTMLDivElement>('#foo').text().trim()).toBe('0')
    expect(wrapper.find<HTMLDivElement>('#bar').text().trim()).toBe('1')
    expect(wrapper.find<HTMLDivElement>('#baz').text().trim()).toBe('2')
  })
})
