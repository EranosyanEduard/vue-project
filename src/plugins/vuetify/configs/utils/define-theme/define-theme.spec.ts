import { describe, expect, it } from 'vitest'
import defineTheme from './define-theme'

describe('Функция defineTheme', () => {
  /**
   * Значения тем на входе в функцию **defineTheme** и на выходе из неё.
   */
  const { input: i, output: o } = {
    input: {
      base: ['#fff', '#ebeff5', '#dce2ea', '#bcc5d1', '#8f9cac'],
      error: '#ce574a',
      info: '#3474c5',
      primary: {
        base: '#1a965a',
        lighten5: '#e8f5ef'
      },
      success: '#319f62',
      text: ['#030724', '#525e74', '#8a92a0', '#fff'],
      warning: '#d9ab36'
    },
    output: {
      'base-1': '#fff',
      'base-2': '#ebeff5',
      'base-3': '#dce2ea',
      'base-4': '#bcc5d1',
      'base-5': '#8f9cac',
      error: '#ce574a',
      info: '#3474c5',
      primary: '#1a965a',
      'primary-lighten5': '#e8f5ef',
      success: '#319f62',
      'text-1': '#030724',
      'text-2': '#525e74',
      'text-3': '#8a92a0',
      'text-4': '#fff',
      warning: '#d9ab36'
    }
  } as const

  it('Возвращает подготовленную конфигурацию темной темы', () => {
    expect(defineTheme({ dark: i })).to.deep.equal({ dark: o })
  })
  it('Возвращает подготовленную конфигурацию светлой темы', () => {
    expect(defineTheme({ light: i })).to.deep.equal({ light: o })
  })
  it('Возвращает подготовленные конфигурации обеих тем', () => {
    expect(defineTheme({ dark: i, light: i })).to.deep.equal({ dark: o, light: o })
  })
})
