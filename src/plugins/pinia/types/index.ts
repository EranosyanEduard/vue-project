import type { StoreDefinition } from 'pinia'
import type { Dictionary } from 'ts-essentials'

/**
 * Тип, представляющий значение, возвращаемое функцией **useStore**.
 */
export type Stores<Hooks extends Dictionary<StoreDefinition>, KeyOf extends keyof Hooks> = {
  [Prop in KeyOf]: ReturnType<Hooks[Prop]>
}
