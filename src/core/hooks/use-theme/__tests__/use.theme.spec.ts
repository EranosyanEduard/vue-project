import { describe, expect, test } from 'vitest'
import { computed, defineComponent } from 'vue'
import { mount, type MountOptions, type Wrapper } from '@vue/test-utils'
import use from '../use'
import { PROPS, PROVIDE_INJECT } from '../utils'

describe('Тест хука "useTheme"', () => {
  const Component = defineComponent({
    name: 'TheTest',
    props: PROPS,
    setup: (props) => {
      const hook = use(props)
      const classes = computed(() => hook.api.classes(hook.api.isDark1))
      return { classes }
    },
    render(h) {
      return h('div', { class: this.classes })
    }
  })

  const m = (opts?: MountOptions<Vue>): Wrapper<Vue> => {
    // @ts-expect-error wtf?
    return mount(Component, opts)
  }

  test('Должен вычислять значение CSS-класса "theme"', async () => {
    const wrapper = m()

    expect(wrapper.classes('theme')).toBe(true)
    expect(wrapper.classes('theme--dark')).toBe(false)
    expect(wrapper.classes('theme--light')).toBe(true)

    await wrapper.setProps({ dark: true })
    expect(wrapper.classes('theme')).toBe(true)
    expect(wrapper.classes('theme--dark')).toBe(true)
    expect(wrapper.classes('theme--light')).toBe(false)

    await wrapper.setProps({ light: true })
    expect(wrapper.classes('theme')).toBe(true)
    expect(wrapper.classes('theme--dark')).toBe(true)
    expect(wrapper.classes('theme--light')).toBe(false)

    await wrapper.setProps({ dark: false })
    expect(wrapper.classes('theme')).toBe(true)
    expect(wrapper.classes('theme--dark')).toBe(false)
    expect(wrapper.classes('theme--light')).toBe(true)
  })

  test('Должен использовать поставляемое значение isDark', async () => {
    const wrapper = m({
      parentComponent: defineComponent({
        setup() {
          PROVIDE_INJECT.provide({ isDark: true })
        }
      })
    })

    expect(wrapper.classes('theme')).toBe(true)
    expect(wrapper.classes('theme--dark')).toBe(true)
    expect(wrapper.classes('theme--light')).toBe(false)

    await wrapper.setProps({ light: true })
    expect(wrapper.classes('theme')).toBe(true)
    expect(wrapper.classes('theme--dark')).toBe(false)
    expect(wrapper.classes('theme--light')).toBe(true)
  })
})
