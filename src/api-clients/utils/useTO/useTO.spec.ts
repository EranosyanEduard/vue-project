import { describe, expect, it } from 'vitest'
import useTO from './useTO'

describe('Тест функции useTO', () => {
  it('resolve', async () => {
    await expect(useTO((resolve) => resolve('resolve'))).resolves.toEqual('resolve')
  })
  it('reject', async () => {
    await expect(useTO((_, reject) => reject(new Error('reject')))).rejects.toThrow('reject')
  })
})
