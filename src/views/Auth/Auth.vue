<script lang="ts">
  import { Carousel } from './components'

  /**
   * Название компонента.
   * @constant
   */
  export const name = 'V_AUTH'

  export default {
    name,
    components: { Carousel },
    setup() {
      const refs = (() => {
        const stackIt = 'https://stack-it.ru'

        return {
          documentation: import.meta.env.VITE_APP_DOC_REF ?? stackIt,
          stackIt
        }
      })()

      return { name, refs }
    }
  }
</script>

<template lang="pug">
v-container.fill-height.pa-0(:data-vue-view='name', fluid, tag='section')
  v-row.fill-height(no-gutters)
    v-col.base-2.pa-10
      carousel
    v-col.auth__column.d-flex.flex-column.justify-space-between.mx-12.pa-10(
      cols='auto',
      tag='v-container'
    )
      v-row.flex-grow-0(tag='header')
        v-col
          img(src='@/assets/images/logo.svg', alt='Логотип компании разработчика')
      v-row.flex-grow-0
        v-col
          router-view
      v-row.flex-grow-0(justify='space-around', tag='footer')
        v-col(cols='auto')
          a.font-weight-regular.text-button(:href='refs.doc', target='_blank') Помощь
        v-col(cols='auto')
          a.auth__reference.font-weight-regular.text-button.text-decoration-none(
            :href='refs.stackIt',
            target='_blank'
          ) Стек
</template>

<style src="./Auth.scss"></style>
