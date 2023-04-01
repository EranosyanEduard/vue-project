import { describe, expect, it } from 'vitest'
import pick from './pick'

describe('Тест функции pick', () => {
  it('Возвращает пустой объект', () => {
    expect(pick({ foo: 'foo', bar: 'bar', baz: 'baz' })).to.deep.equal({})
  })
  it('Возвращает объект, с выбранными свойствами', () => {
    expect(pick({ foo: 'foo', bar: 'bar', baz: 'baz' }, 'bar')).to.deep.equal({
      bar: 'bar'
    })
  })
})
