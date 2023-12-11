<script lang="ts" setup>
import bem from 'common-bem'
import { pick } from 'lodash'
import { computed, type PropType } from 'vue'
import type { StyleValue } from 'vue/types/jsx'
import type { U } from '@/core/d-ts'
import {
  useElevation,
  useMeasure,
  useRoundable,
  useTheme,
  UTILS
} from '@/core/hooks'
import { setColor } from '../utils'

/**
 * Основной контейнер, предоставляемый UI-библиотекой Vuetify.
 *
 * @author Ераносян Эдуард
 * @since 1.0.0
 * @version 1.0.0
 */

const props = defineProps({
  ...UTILS.USE_ELEVATION.PROPS,
  ...UTILS.USE_MEASURE.PROPS,
  ...UTILS.USE_ROUNDABLE.PROPS,
  ...UTILS.USE_THEME.PROPS,
  /**
   * Цвет фона компонента.
   */
  color: {
    type: String as PropType<U.Or.Undefined<string>>,
    default: undefined
  },
  /**
   * Применить стили **outlined** компонента.
   */
  outlined: { type: Boolean, default: false },
  /**
   * Добавить border-radius к левой верхней и правой нижней границам
   * компонента.
   */
  shaped: { type: Boolean, default: false }
})

/** БЭМ-api */
const b = bem.lock('v-sheet')

/** Хуки */
const h = {
  elevation: useElevation(props),
  measure: useMeasure(props),
  rounded: useRoundable(props),
  theme: useTheme(props)
} as const

/** CSS-классы компонента */
const classes = computed(() => [
  b(pick(props, ['outlined', 'shaped'])),
  h.elevation.api.elevation,
  h.rounded.api.rounded,
  h.theme.api.classes(h.theme.api.isDark1)
])

/** CSS-стили компонента */
const style = computed<StyleValue>(() => [h.measure.api.style])
</script>

<template>
  <div v-bind="setColor('backgroundColor', color, { class: classes, style })">
    <!-- @slot Контент компонента -->
    <slot />
  </div>
</template>

<style scoped>
/** @define v-sheet */

.v-sheet {
  background-color: var(--theme-card-background);
  border-color: var(--theme-card-border);
  border-radius: var(--v-sheet-bd-rs, 0);
  box-shadow: var(--v-sheet-elevation-umbra, var(--theme-shadow-umbra-0)),
    var(--v-sheet-elevation-penumbra, var(--theme-shadow-penumbra-0)),
    var(--v-sheet-elevation-ambient, var(--theme-shadow-ambient-0));
  color: var(--theme-text-primary);
}

.v-sheet--outlined {
  border-style: var(--v-sheet-outlined-border-width, thin) solid
    var(--theme-divider-color);
  box-shadow: none;
}

.v-sheet--shaped {
  border-radius: var(--theme-rounded-xl) 0;
}
</style>
