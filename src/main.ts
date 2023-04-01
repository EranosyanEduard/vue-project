import Vue from 'vue'
import { pinia, router, useCustom, vuetify } from './plugins'
import App from './App.vue'

useCustom()

new Vue({
  pinia,
  router,
  vuetify,
  render: (h) => h(App)
}).$mount('#app')
