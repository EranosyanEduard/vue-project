import { V_AUTH, V_MY_CONTRACTS, V_SIGN_IN, V_SIGN_UP } from '@/views'
import type { RouteConfig } from 'vue-router'
import { requiresAuth } from './hooks'
import { defineRouteNames } from './utils'

const routes: RouteConfig[] = [
  {
    path: '/auth',
    name: V_AUTH,
    async component() {
      const component = await import('@/views/Auth/Auth.vue')
      return component
    },
    children: [
      {
        path: 'sign-in',
        name: V_SIGN_IN,
        async component() {
          const component = await import('@/views/Auth/children/sign-in/SignIn.vue')
          return component
        }
      },
      {
        path: 'sign-up',
        name: V_SIGN_UP,
        async component() {
          const component = await import('@/views/Auth/children/sign-up/SignUp.vue')
          return component
        }
      }
    ],
    redirect: { name: V_SIGN_IN }
  },
  {
    beforeEnter: requiresAuth,
    path: '/',
    name: V_MY_CONTRACTS,
    meta: { [requiresAuth.name]: true },
    async component() {
      const component = await import('@/views/MyContracts/MyContracts.vue')
      return component
    }
  }
]

/**
 * Перечисление маршрутов.
 * @enum
 */
const RouteName = defineRouteNames(routes) as Readonly<
  Enum<[typeof V_AUTH, typeof V_MY_CONTRACTS, typeof V_SIGN_IN, typeof V_SIGN_UP]>
>

export default routes
export { RouteName }
