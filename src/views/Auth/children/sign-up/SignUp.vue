<script lang="ts">
  export const name = 'V_SIGN_UP'

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
