import type { VueConstructor } from 'vue'

/**
 * Определить глобальные Vue-компоненты.
 * @param VueCons Vue-конструктор
 * @param components компоненты
 */
function defineComponents(
  VueCons: VueConstructor,
  ...components: Array<Parameters<VueConstructor['component']>>
): void {
  components.forEach(([id, comp]) => VueCons.component(id, comp))
}

export default defineComponents
