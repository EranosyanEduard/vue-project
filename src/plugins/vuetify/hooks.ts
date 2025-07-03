import type { Framework } from 'vuetify'
import vuetify from './instance'

/**
 * Возвращает экземпляр фреймворка vuetify.
 */
export const useVuetify: () => { readonly $vuetify: Framework } = () => ({
  $vuetify: vuetify.framework
})
