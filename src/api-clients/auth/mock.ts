import { faker } from '@faker-js/faker/locale/ru'
import type { TUser } from 'api-models'
import type { DeepReadonly } from 'ts-essentials'
import { useTO } from '../utils'
import type * as I from './interfaces'

const apiClient: DeepReadonly<I.IApiClient> = {
  c: {
    async session(credentials) {
      const data = await useTO<TUser.IUser>((resolve, reject) => {
        const { password, username } = credentials
        const { VITE_DEFAULT_PASSWORD = '[7wjw8,D', VITE_DEFAULT_USERNAME = 'web@stack-it.ru' } =
          import.meta.env

        if (VITE_DEFAULT_PASSWORD === password && VITE_DEFAULT_USERNAME === username) {
          resolve({
            email: 'lexxarsh@gmail.com',
            'x-api-token': faker.datatype.uuid(),
            ид: 15,
            логин: 'stonum',
            открытыймесяц: faker.date.month(),
            требуетсясменапароля: faker.datatype.number({ max: 1, min: 0 })
          })
        } else {
          reject(new Error('Неверные учетные данные'))
        }
      })
      return data
    },
    async user() {
      return { result: true }
    }
  },
  d: {
    async session() {
      return { logout: true }
    }
  }
}

export default apiClient
