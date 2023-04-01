import { describe, expect, it } from 'vitest'
import createEnum from './create-enum'

describe('Тест функции createEnum', () => {
  it('Возвращает объект, представляющий перечисление', () => {
    expect(createEnum(['foo', 'bar', 'baz'])).to.deep.equal({ foo: 'foo', bar: 'bar', baz: 'baz' })
  })
})
