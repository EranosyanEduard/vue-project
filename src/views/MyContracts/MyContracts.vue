<script lang="ts">
  /**
   * Название компонента.
   * @constant
   */
  export const name = 'V_MY_CONTRACTS'

  export default {
    name,
    setup() {
      return { name }
    }
  }
</script>

<template lang="pug">
span(:data-vue-view='name')
</template>
