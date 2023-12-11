import { entries, isUndefined, mapValues } from 'lodash'
import type { Dictionary, StrictExclude, ValueOf } from 'ts-essentials'
import units from 'units-css'
import { computed, reactive } from 'vue'
import type { V } from '@/core/d-ts'
import { useApi, useSync } from '@/core/subhooks'
import type { Refs } from './types'
import { PROPS, VALIDATOR } from './utils'

/**
 * Хук, позволяющий управлять размерами компонента.
 *
 * @author Ераносян Эдуард
 * @since 1.0.0
 * @version 1.0.0
 */
const use = (target: V.WatchSources<Refs>) => {
  const api = useApi({
    style: computed<{
      [P in keyof Refs]?: StrictExclude<Refs[P], number>
    }>(() => {
      return entries(refs).reduce<
        Dictionary<StrictExclude<ValueOf<Refs>, number>>
      >((acc, [key, value]) => {
        if (!isUndefined(value)) {
          const parsedValue = units.parse(value, key)
          acc[key] = `${parsedValue.value}${parsedValue.unit}`
        }
        return acc
      }, {})
    })
  })
  const refs = reactive<Refs>(mapValues(PROPS, () => undefined))
  const sync = useSync(refs, target, {
    validators: mapValues(PROPS, () => VALIDATOR)
  })

  return { api, sync }
}

export default use
