import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import vue2 from '@vitejs/plugin-vue2'

// Custom
import Components from 'unplugin-vue-components/vite'
import { VuetifyResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue2(),
    legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    }),
    Components({
      dts: true,
      resolvers: [VuetifyResolver()]
    })
  ],
  css: {
    preprocessorOptions: {
      sass: {
        additionalData: ['@import "@/plugins/vuetify/styles/variables.scss"', ''].join('\n')
      }
    }
  },
  resolve: {
    alias: [
      ['@', './src'],
      ['api-models', './src/core/api-models'],
      ['x-components', './src/core/components'],
      ['x-ts-essentials', './src/core/ts-essentials'],
      ['x-utils', './src/core/utils']
    ].reduce<Record<string, string>>((acc, it) => {
      acc[it[0]] = fileURLToPath(new URL(it[1], import.meta.url))
      return acc
    }, {})
  }
})
