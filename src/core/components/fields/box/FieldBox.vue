<script lang="ts">
  import type { PropType } from 'vue'
  import { string } from 'yup'

  /**
   * Название компонента.
   * @const
   */
  export const name = 'XFieldBox'

  export default {
    name,
    props: {
      /**
       * Заголовок поля ввода
       */
      label: {
        type: String as PropType<Nullable<string>>,
        default: null
      }
    },
    setup() {
      const rules = {
        isRequired(v: Nullable<string>) {
          return string().required().isValidSync(v) || 'Заполните данное поле'
        }
      } as const

      return {
        name,
        /**
         * Возвращает массив функций-валидаторов, порядок которых соответствует
         * порядку аргументов функции.
         * @param keys названия правил валидации
         */
        pickRules<K extends keyof typeof rules>(...keys: K[]): ReadonlyArray<(typeof rules)[K]> {
          return keys.map((it) => rules[it])
        },
        props: {
          outlined: true
        }
      }
    }
  }
</script>

<template lang="pug">
div(:data-vue-component='name')
  span.d-block.mb-1.text-2--text.text-caption(v-if='label !== null') {{ label }}
  //- @slot Основной контент компонента
  slot(:pick-rules='pickRules', :props='props')
</template>
