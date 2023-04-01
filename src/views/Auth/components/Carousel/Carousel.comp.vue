<script lang="ts">
  /**
   * Название компонента.
   * @constant
   */
  const name = 'Carousel'

  export default {
    name,
    setup() {
      const items = [
        {
          title: 'Будьте в курсе',
          subtitle: 'Просматривайте информацию по заключенным договорам и выгружайте реализацию'
        },
        {
          title: 'Передавайте показания',
          subtitle: 'Передавайте показания и просматривайте историю по приборам учета'
        },
        {
          title: 'Анализируйте данные',
          subtitle: 'Стройте отчеты, анализируйте объемы потребления и обороты за период'
        }
      ].map((it, i) => ({
        ...it,
        img: new URL(`/src/assets/images/carousel-item-${i + 1}.png`, import.meta.url).href
      }))

      return { items, name }
    }
  }
</script>

<template lang="pug">
v-carousel(
  cycle,
  :data-vue-comp='name',
  height='100%',
  hide-delimiter-background,
  :show-arrows='false'
)
  v-carousel-item(v-for='{ img, title, subtitle } in items', :key='img')
    .d-flex.fill-height
      figure.carousel__figure.ma-auto.text-center
        img(:src='img', alt='Иллюстрация функционала приложения')
        figcaption
          span.d-block.mb-6.text-1--text.text-h2 {{ title }}
          span.text-2--text.text-body-2 {{ subtitle }}
</template>

<style src="./Carousel.scss"></style>
