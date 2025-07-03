import Vue from 'vue'
import { pinia, router, vuetify } from './plugins'
import App from './App.vue'

new Vue({
  pinia,
  router,
  vuetify,
  render: (h) => h(App)
}).$mount('#app')
