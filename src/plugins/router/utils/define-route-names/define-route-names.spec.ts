import { describe, expect, it } from 'vitest'
import type { RouteConfig } from 'vue-router'
import defineRouteNames from './define-route-names'

describe('Тест функции defineRouteNames', () => {
  const routes: RouteConfig[] = [
    {
      path: '/'
    },
    {
      name: 'AUTH',
      path: '/auth',
      children: [
        {
          name: 'SIGN_IN',
          path: 'sign-in'
        },
        {
          name: 'SIGN_UP',
          path: 'sign-up'
        }
      ]
    }
  ]

  it('Возвращает перечисление маршрутов', () => {
    expect(defineRouteNames(routes)).to.deep.equal({
      AUTH: 'AUTH',
      SIGN_IN: 'SIGN_IN',
      SIGN_UP: 'SIGN_UP'
    })
  })
})
