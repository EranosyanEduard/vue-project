<script setup lang="ts">
import { ref } from 'vue'
import { SMessages, SSheet } from './core/components'

const messages = ref<string[]>([])
</script>

<template>
  <div id="app">
    <SSheet />
    <SMessages :value="messages" />
  </div>
</template>
