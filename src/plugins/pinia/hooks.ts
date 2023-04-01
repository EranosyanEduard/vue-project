import type { StoreDefinition } from 'pinia'
import useAuthStore from './auth'
import AllStores from './names'
import type { Stores } from './types'

const hooks = {
  [AllStores.auth]: useAuthStore
} as const

/**
 * Вернуть хранилища с указанными идентификаторами.
 * @param storeIDs идентификаторы хранилищ
 */
export const useStore = <K extends keyof typeof hooks>(
  ...storeIDs: K[]
): Readonly<Stores<typeof hooks, K>> => {
  return storeIDs.reduce<Record<string, ReturnType<StoreDefinition>>>((acc, it) => {
    acc[it] = hooks[it]()
    return acc
  }, {}) as ReturnType<typeof useStore>
}
