/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * URL-адрес руководства пользователя приложения.
   */
  readonly VITE_APP_DOC_REF?: string
  /**
   * Режим эксплуатации приложения.
   */
  readonly VITE_APP_MODE?: Uppercase<'dev' | 'prod'>
  /**
   * URL-адрес сервера.
   */
  readonly VITE_BACKEND_URL?: string
  /**
   * Пароль пользователя в режиме разработки.
   */
  readonly VITE_DEFAULT_PASSWORD?: '[7wjw8,D'
  /**
   * Логин пользователя в режиме разработки.
   */
  readonly VITE_DEFAULT_USERNAME?: 'web@stack-it.ru'
  /**
   * HTTP-заголовок для передачи токена.
   */
  readonly VITE_TOKEN_HEADER?: 'x-api-token'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
