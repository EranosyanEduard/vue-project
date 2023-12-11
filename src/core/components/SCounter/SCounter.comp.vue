<script lang="ts" setup>
import bem from 'common-bem'
import { lt, toNumber } from 'lodash'
import type { Dictionary } from 'ts-essentials'
import { computed, type PropOptions, type PropType } from 'vue'
import { z } from 'zod'
import type { V } from '@/core/d-ts'
import { useTheme, UTILS } from '@/core/hooks'

/**
 * Счётчик, предоставляемый UI-библиотекой Vuetify.
 *
 * @author Ераносян Эдуард
 * @since 1.0.0
 * @version 1.0.0
 */

const props = defineProps({
  ...UTILS.USE_THEME.PROPS,
  /**
   * - Максимальное значение.
   * - Текущее значение.
   */
  ...(['max', 'value'].reduce<Dictionary<PropOptions<number | string>>>(
    (acc, it) => {
      acc[it] = {
        default: 0,
        type: [Number, String] as PropType<number | string>,
        validator(v: unknown): boolean {
          return z.coerce.number().nonnegative().safeParse(v).success
        }
      }
      return acc
    },
    {}
  ) as V.Props<Dictionary<number | string, 'max' | 'value'>>)
})

/** БЭМ-api */
const b = bem.lock('v-counter')

/** Хуки */
const h = { theme: useTheme(props) } as const

/** CSS-классы компонента */
const classes = computed(() => [
  b({ error: lt(props.max, props.value) }),
  h.theme.api.classes(h.theme.api.isDark1)
])

/** Контент компонента */
const content = computed(() => {
  return toNumber(props.max) > 0 ? `${props.value} / ${props.max}` : props.value
})
</script>

<template>
  <div :class="classes">
    <!-- @slot Контент компонента -->
    <slot>{{ content }}</slot>
  </div>
</template>

<style scoped>
/** @define v-counter */

.v-counter {
  --v-counter-fz-default: 12px;
  --v-counter-lh-default: var(--v-counter-fz-default);
  --v-counter-mh-default: var(--v-counter-fz-default);

  color: var(--theme-text-secondary);
  flex: 0 1 auto;
  font-size: var(--v-counter-fz, var(--v-counter-fz-default));
  line-height: var(--v-counter-lh, var(--v-counter-lh-default));
  min-height: var(--v-counter-mh, var(--v-counter-mh-default));
}

.v-counter--error {
  color: var(--theme-color-error);
}
</style>
