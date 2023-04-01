import apiClients from '@/api-clients'
import type { TUser } from 'api-models'
import { defineStore } from 'pinia'
import is from 'relax-is/src'
import AllStores from '../names'
import type * as I from './interfaces'

const useAuthStore = defineStore({
  id: AllStores.auth,
  state() {
    const state: I.IState = { user: null }
    return state
  },
  actions: {
    /**
     * Войти в личный кабинет ЮЛ.
     * @param credentials учетные данные пользователя.
     */
    async signIn(credentials: TUser.ICredentials): Promise<TUser.IUser> {
      try {
        this.user = await apiClients.user.c.session(credentials)
        const { VITE_TOKEN_HEADER = 'x-api-token' } = import.meta.env
        localStorage.setItem(VITE_TOKEN_HEADER, this.user['x-api-token'])
        return this.user
      } catch (error) {
        throw new Error('ошибка в методе signIn')
      }
    },
    /**
     * Выйти из личного кабинета ЮЛ.
     */
    async signOut(): Promise<void> {
      try {
        await apiClients.user.d.session()
        this.user = null
        localStorage.clear()
      } catch (error) {
        throw new Error('ошибка в методе signOut')
      }
    }
  },
  getters: {
    /**
     * Логическое значение, указывающее на наличие пользователя в
     * хранилище. Пользователь может появиться в хранилище только при успешном
     * входе в приложение.
     */
    hasUser(): boolean {
      return is.not.null(this.user)
    }
  }
})

export default useAuthStore
