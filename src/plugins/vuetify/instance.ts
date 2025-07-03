import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

const vuetify = new Vuetify({
  theme: {
    options: {
      customProperties: true,
      variations: false
    }
  }
})

export default vuetify
