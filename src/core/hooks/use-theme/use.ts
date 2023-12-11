import bem from 'common-bem'
import { computed, reactive } from 'vue'
import type { U, V } from '@/core/d-ts'
import { useApi, useSync } from '@/core/subhooks'
import type { Refs } from './types'
import { PROVIDE_INJECT } from './utils'

/**
 * Хук, позволяющий управлять темой компонента.
 *
 * @author Ераносян Эдуард
 * @since 1.0.0
 * @version 1.0.0
 */
const use = (target: V.WatchSources<Refs>) => {
  const b = bem.lock('theme')
  const injectedTheme = PROVIDE_INJECT.inject({ isDark: false })

  const computedIsDark = computed<U.Or.Undefined<boolean>>(() => {
    if (refs.dark) return true
    if (refs.light) return false
    return undefined
  })

  const api = useApi({
    /**
     * Возвращает CSS-классы, специфичные для выбранной темы.
     * @param isDark использовать тёмную тему.
     */
    classes(isDark: boolean): `theme theme--${keyof Refs}` {
      // @ts-expect-error Значение соответствует типу, возвращаемому функцией.
      return b({ dark: isDark, light: !isDark })
    },
    /**
     * Флаг "Компонент использует тёмную тему".
     * Если **dark** и **light** равны false, использовать значение,
     * поставленное с помощью конструкции **inject**.
     */
    isDark1: computed<boolean>(
      () => computedIsDark.value ?? injectedTheme.isDark
    ),
    /**
     * Флаг "Компонент использует тёмную тему".
     * Если **dark** и **light** равны false, использовать значение,
     * поставленное библиотекой **Vuetify**.
     */
    isDark2: computed<boolean>(() => computedIsDark.value ?? false)
  })
  const refs = reactive<Refs>({ dark: false, light: false })
  const sync = useSync(refs, target)

  PROVIDE_INJECT.provide({ isDark: api.isDark1 })

  return { api, sync }
}

export default use
