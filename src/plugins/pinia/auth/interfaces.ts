import type { TUser } from 'api-models'

/**
 * Интерфейс состояния (state) хранилища.
 */
export interface IState {
  user: Nullable<TUser.IUser>
}
