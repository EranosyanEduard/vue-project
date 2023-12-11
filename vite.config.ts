import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import vue2 from '@vitejs/plugin-vue2'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue2(),
    legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    })
  ],
  resolve: {
    alias: [['@', './src']].reduce<Record<string, string>>((acc, it) => {
      acc[it[0]] = fileURLToPath(new URL(it[1], import.meta.url))
      return acc
    }, {})
  }
})
