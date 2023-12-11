import { isBoolean } from 'lodash'
import { computed, reactive } from 'vue'
import z from 'zod'
import type { U, V } from '@/core/d-ts'
import { SubhookTypes, useApi, useSync } from '@/core/subhooks'
import type { IRefs } from './types'
import { Rounded } from './utils'

/**
 * Хук, позволяющий управлять радиусом границ компонента.
 *
 * @author Ераносян Эдуард
 * @since 1.0.0
 * @version 1.0.0
 */
const use = (target: V.WatchSources<IRefs>) => {
  const api = useApi({
    rounded: computed<U.Or.Undefined<string>>(() => {
      if (refs.tile) {
        return 'rounded-0'
      }
      if (isBoolean(refs.rounded)) {
        return refs.rounded ? 'rounded' : undefined
      }
      return refs.rounded === Rounded.enum.md
        ? 'rounded'
        : `rounded-${refs.rounded}`
    })
  })
  const refs = reactive<IRefs>({ rounded: false, tile: false })
  const sync = useSync(refs, target, {
    validators: {
      rounded: (v) => {
        return (
          z
            .boolean()
            .or(z.coerce.number().min(0).max(0))
            .or(Rounded)
            .safeParse(v).success || {
            [SubhookTypes.UseSync.FALLBACK_VALUE_KEY]: false
          }
        )
      }
    }
  })

  return { api, sync }
}

export default use
