/**
 * Учетные данные пользователя.
 */
export interface ICredentials {
  password: string
  recaptchaToken: string
  username: string
}

/**
 * Пользователь.
 */
export interface IUser {
  email: string
  'x-api-token': string
  ид: number
  логин: string
  открытыймесяц: string
  требуетсясменапароля: number
}
