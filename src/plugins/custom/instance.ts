import type { VueConstructor } from 'vue'
import { FIELD_BOX, FieldBox } from 'x-components'
import { defineComponents } from './utils'

const my = {
  install(VueCons: VueConstructor) {
    defineComponents(VueCons, [FIELD_BOX, FieldBox])
  }
}

export default my
