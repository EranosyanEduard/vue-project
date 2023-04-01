import Vue from 'vue'
import Vuetify from 'vuetify'
import './styles/overrides.scss'
import { useTheme } from './configs'

Vue.use(Vuetify)

const { breakpoint, themes } = useTheme('Default')

const vuetify = new Vuetify({
  breakpoint,
  theme: {
    options: {
      customProperties: true,
      variations: false
    },
    themes
  }
})

export default vuetify
