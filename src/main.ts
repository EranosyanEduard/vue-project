import Vue, { type VNode } from 'vue'
import App from './App.vue'
import './styles/index.css'

new Vue({ render: (h): VNode => h(App) }).$mount('#app')
