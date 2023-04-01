import Vue from 'vue'
import my from './instance'

/**
 * Зарегистрировать собственный Vue-плагин.
 */
export const useCustom: Factory<void> = () => Vue.use(my)
