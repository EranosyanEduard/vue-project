import { V_AUTH } from '@/views'
import is from 'relax-is'
import type { NavigationGuard } from 'vue-router'

/**
 * Защитить маршруты, требующие авторизации, от прямого перехода.
 * @param to маршрут "куда"
 * @param from маршрут "откуда"
 * @param next маршрутизатор
 */
export const requiresAuth: NavigationGuard = (to, from, next) => {
  const { VITE_TOKEN_HEADER = 'x-api-token' } = import.meta.env

  if (is.truthy(to.meta?.[requiresAuth.name]) && is.null(localStorage.getItem(VITE_TOKEN_HEADER))) {
    next({ name: V_AUTH })
  } else {
    next()
  }
}
