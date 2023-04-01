import type { TCompany, TUser } from 'api-models'
import type * as I from './interfaces'
import { defineApiClient } from '@/core'

/**
 * Название ресурса.
 * @constant
 */
const RESOURCE = 'auth'

export default defineApiClient<I.IApiClient>({
  c: {
    async session(body) {
      const data = await this.post<TUser.IUser, TUser.ICredentials>({
        body,
        requiresToken: false,
        url: `${RESOURCE}/login`
      })
      return data
    },
    async user(body) {
      const data = await this.post<I.ISignUp, TCompany.INew>({
        body,
        requiresToken: false,
        url: `${RESOURCE}/registration`
      })
      return data
    }
  },
  d: {
    async session() {
      const data = await this.post<I.ILogout, never>({
        requiresToken: false,
        url: `${RESOURCE}/logout`
      })
      return data
    }
  }
})
