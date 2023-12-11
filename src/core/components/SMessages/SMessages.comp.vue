<script lang="ts" setup>
import bem from 'common-bem'
import { computed, type PropType } from 'vue'
import { z } from 'zod'
import type { U } from '@/core/d-ts'
import { useTheme, UTILS } from '@/core/hooks'
import { setColor } from '../utils'

/**
 * Список сообщений, предоставляемый UI-библиотекой Vuetify.
 *
 * @author Ераносян Эдуард
 * @since 1.0.0
 * @version 1.0.0
 */

const props = defineProps({
  ...UTILS.USE_THEME.PROPS,
  /**
   * Цвет текста компонента.
   */
  color: {
    type: String as PropType<U.Or.Undefined<string>>,
    default: undefined
  },
  /**
   * Список сообщений.
   */
  value: {
    type: Array as PropType<Array<number | string>>,
    default: () => [],
    validator(v: unknown) {
      return z.number().or(z.string()).array().safeParse(v).success
    }
  }
})

/** БЭМ-api */
const b = bem.lock('v-messages')

/** Хуки */
const h = { theme: useTheme(props) } as const

/** CSS-классы компонента */
const classes = computed(() => [b(), h.theme.api.classes(h.theme.api.isDark1)])
</script>

<template>
  <div v-bind="setColor('color', color, { class: classes })">
    <TransitionGroup
      :class="b('wrapper')"
      name="message-transition"
      tag="div"
    >
      <div
        v-for="(message, index) in value"
        :key="`${message}-${index}`"
        :class="b('message')"
      >
        <!-- @slot Контент сообщения -->
        <slot
          :index="index"
          :message="message"
        >
          {{ message }}
        </slot>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
/** @define v-messages */

.v-messages {
  color: var(--theme-text-secondary);
  flex: 1 1 auto;
  font-size: var(--v-messages-fz, 12px);
  min-height: var(--v-messages-mh, 14px);
  min-width: 1px;
}

.v-messages__message {
  hyphens: auto;
  line-height: var(--v-messages-lh, 12px);
  overflow-wrap: break-word;
  word-break: break-word;
  word-wrap: break-word;
}
</style>
