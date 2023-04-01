<script setup lang="ts"></script>

<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<style lang="scss">
  @import '../node_modules/vuetify/src/styles/styles.sass';

  @for $i from 1 through $spacers-steps {
    :root {
      --s-spacer-#{$i}: calc(#{$spacer} * #{$i});
    }
  }

  #app {
    color: var(--v-text-1-base);
  }
</style>
