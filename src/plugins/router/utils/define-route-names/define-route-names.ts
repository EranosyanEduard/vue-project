import is from 'relax-is'
import type { Dictionary } from 'ts-essentials'
import type { RouteConfig } from 'vue-router'

/**
 * Перечисление маршрутов.
 */
type RouteNames = ReturnType<typeof defineRouteNames>

/**
 * Возвращает объект, представляющий перечисление маршрутов.
 * @param routeConfig конфигурация маршрутов
 * @example
 * import type { RouteConfig } from 'vue-router'
 *
 * const routes: RouteConfig[] = [
 *   {
 *     path: '/'
 *   },
 *   {
 *     name: 'AUTH',
 *     path: '/auth',
 *     children: [
 *       {
 *         name: 'SIGN_IN',
 *         path: 'sign-in'
 *       },
 *       {
 *         name: 'SIGN_UP',
 *         path: 'sign-up'
 *       }
 *     ]
 *   }
 * ];
 *
 * console.log(defineRouteNames(routes)); // { AUTH: 'AUTH', SIGN_IN: 'SIGN_IN', SIGN_UP: 'SIGN_UP' }
 */
function defineRouteNames(
  routeConfig: RouteConfig[]
): Dictionary<NonNullable<RouteConfig['name']>> {
  const go = (config: RouteConfig[], acc: RouteNames): RouteNames => {
    return config.reduce<RouteNames>((thisAcc, { children, name }) => {
      if (is.str(name)) {
        thisAcc[name] = name
        if (is.arr(children)) go(children, thisAcc)
      }
      return thisAcc
    }, acc)
  }

  return go(routeConfig, {})
}

export default defineRouteNames
