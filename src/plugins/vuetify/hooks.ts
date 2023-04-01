import type { Framework } from 'vuetify'
import vuetify from './instance'

/**
 * Возвращает экземпляр фреймворка vuetify.
 */
export const useVuetify: Factory<{ $vuetify: Framework }> = () => ({ $vuetify: vuetify.framework })
