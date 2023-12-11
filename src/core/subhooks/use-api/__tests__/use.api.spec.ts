import { describe, expect, test, vi } from 'vitest'
import { computed, ref } from 'vue'
import use from '../use'
import { noop } from 'lodash'

describe('Тест хука "useApi"', () => {
  test('Должен проксировать интерфейсы ComputedRef и Ref, а остальные - оставлять в исходном состоянии', () => {
    const counter = ref(0)
    const computedCounter = computed(() => counter.value)
    const logCounter: VoidFunction = () => counter.value
    const apiLike = use({ counter, computedCounter, logCounter })

    expect(apiLike.counter).toBe(0)
    expect(apiLike.computedCounter).toBe(0)
    expect(counter.value).toBe(0)
    expect(computedCounter.value).toBe(0)

    apiLike.counter++
    expect(apiLike.counter).toBe(1)
    expect(apiLike.computedCounter).toBe(1)
    expect(counter.value).toBe(1)
    expect(computedCounter.value).toBe(1)

    counter.value++
    expect(apiLike.counter).toBe(2)
    expect(apiLike.computedCounter).toBe(2)
    expect(counter.value).toBe(2)
    expect(computedCounter.value).toBe(2)

    expect(apiLike.logCounter).toStrictEqual(logCounter)
  })

  test('Должен сообщать об ошибке, которая может возникнуть при присваивании значения', () => {
    const a = ref(0)
    const apiLike = use({
      failure: computed(() => a.value),
      success: computed({ get: () => a.value, set: (v) => (a.value = v) })
    })
    const spy = vi.spyOn(console, 'table').mockImplementation(noop)

    apiLike.success++
    expect(apiLike.failure).toBe(1)
    expect(apiLike.success).toBe(1)
    expect(spy).not.toHaveBeenCalled()

    apiLike.failure++
    expect(apiLike.failure).toBe(1)
    expect(apiLike.success).toBe(1)
    expect(spy).toHaveBeenCalledWith({
      error: 'невозможно присвоить значение',
      hook: 'useApi',
      key: 'failure'
    })
    expect(spy).toHaveBeenCalledTimes(1)

    vi.resetAllMocks()
  })
})
