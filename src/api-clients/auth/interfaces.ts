import type { TCompany, TUser } from 'api-models'

/**
 * Ответ на запрос о выходе из приложения.
 */
export interface ILogout {
  logout: boolean
}

/**
 * Ответ на запрос о регистрации пользователя.
 */
export interface ISignUp {
  result: boolean
}

/**
 * Api-клиент для ресурса "auth".
 */
export interface IApiClient {
  c: {
    /**
     * Войти в личный кабинет ЮЛ.
     * @param credentials учетные данные пользователя
     */
    session: (credentials: Readonly<TUser.ICredentials>) => Promise<TUser.IUser>
    /**
     * Зарегистрировать нового пользователя в личном кабинете ЮЛ.
     * @param user данные пользователя
     */
    user: (user: Readonly<TCompany.INew>) => Promise<ISignUp>
  }
  d: {
    /**
     * Выйти из личного кабинета ЮЛ.
     */
    session: () => Promise<ILogout>
  }
}
